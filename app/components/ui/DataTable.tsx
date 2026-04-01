'use client';

import { useState, useMemo, type ReactNode } from 'react';

interface Column<T> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (item: T) => ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchable?: boolean;
  searchPlaceholder?: string;
  pageSize?: number;
  onRowClick?: (item: T) => void;
  emptyMessage?: string;
}

export default function DataTable<T extends Record<string, unknown>>({
  data, columns, searchable = true, searchPlaceholder = 'Search...',
  pageSize = 10, onRowClick, emptyMessage = 'No data found',
}: DataTableProps<T>) {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let result = [...data];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(item =>
        columns.some(col => {
          const val = item[col.key];
          return val !== null && val !== undefined && String(val).toLowerCase().includes(q);
        })
      );
    }

    if (sortKey) {
      result.sort((a, b) => {
        const aVal = a[sortKey] ?? '';
        const bVal = b[sortKey] ?? '';
        const cmp = String(aVal).localeCompare(String(bVal), undefined, { numeric: true });
        return sortDir === 'asc' ? cmp : -cmp;
      });
    }

    return result;
  }, [data, search, sortKey, sortDir, columns]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  return (
    <div className="ex-table-wrapper">
      {searchable && (
        <div className="ex-table__search">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            placeholder={searchPlaceholder}
            className="ex-table__search-input"
          />
        </div>
      )}

      <div className="ex-table-scroll">
        <table className="ex-table">
          <thead>
            <tr>
              {columns.map(col => (
                <th
                  key={col.key}
                  className={col.sortable ? 'ex-table__th--sortable' : ''}
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  <span>{col.label}</span>
                  {col.sortable && sortKey === col.key && (
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" className="ex-table__sort-icon">
                      <path d={sortDir === 'asc' ? 'M7 14l5-5 5 5H7z' : 'M7 10l5 5 5-5H7z'} />
                    </svg>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="ex-table__empty">{emptyMessage}</td>
              </tr>
            ) : (
              paged.map((item, i) => (
                <tr
                  key={String(item['id'] ?? i)}
                  className={onRowClick ? 'ex-table__row--clickable' : ''}
                  onClick={() => onRowClick?.(item)}
                >
                  {columns.map(col => (
                    <td key={col.key}>
                      {col.render ? col.render(item) : String(item[col.key] ?? '—')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="ex-table__pagination">
          <span className="ex-table__page-info">
            Page {page} of {totalPages} ({filtered.length} results)
          </span>
          <div className="ex-table__page-btns">
            <button disabled={page <= 1} onClick={() => setPage(p => p - 1)} className="ex-table__page-btn">
              ← Prev
            </button>
            <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)} className="ex-table__page-btn">
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
