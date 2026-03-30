'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { Bell, CheckCheck, Loader2, Trash2 } from 'lucide-react'
import { useNotifications } from '@/hooks/useNotifications'
import type { NotificationFilter } from '@/types/notification'

const filters: NotificationFilter[] = ['todas', 'no leida', 'leida']

export default function Navbar() {
  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  const {
    open,
    filter,
    unreadCount,
    visibleNotifications,
    isLoading,
    isLoadingMore,
    error,
    notificationRef,
    toggleNotifications,
    setFilter,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    loadMoreNotifications,
    hasMore,
    refreshNotifications
  } = useNotifications()

  useEffect(() => {
    const target = loadMoreRef.current

    if (!open || !target || !hasMore) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0]

        if (firstEntry?.isIntersecting) {
          void loadMoreNotifications()
        }
      },
      {
        root: null,
        rootMargin: '80px',
        threshold: 0.1
      }
    )

    observer.observe(target)

    return () => {
      observer.disconnect()
    }
  }, [open, hasMore, loadMoreNotifications, visibleNotifications.length])

  return (
    <nav className="border-b border-stone-200 bg-white px-4 py-3 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-stone-900 transition hover:text-amber-600"
        >
          PropBol
        </Link>

        {/* Notification Bell */}
        <div className="relative" ref={notificationRef}>
          <button
            type="button"
            onClick={toggleNotifications}
            className="relative rounded-full p-2 text-stone-600 transition hover:bg-amber-50 hover:text-amber-600"
            aria-label="Abrir notificaciones"
          >
            <Bell className="h-6 w-6" />

            {unreadCount > 0 ? (
              <span className="absolute -right-1 -top-1 inline-flex min-h-[20px] min-w-[20px] items-center justify-center rounded-full bg-amber-600 px-1 text-[11px] font-semibold text-white">
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            ) : null}
          </button>

          {/* Dropdown */}
          {open ? (
            <div className="absolute right-0 z-50 mt-3 w-[360px] overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xl">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-stone-100 px-4 py-3">
                <div>
                  <h3 className="text-sm font-semibold text-stone-900">Notificaciones</h3>
                  <p className="text-xs text-stone-500">Gestiona tus avisos recientes</p>
                </div>

                <button
                  onClick={() => void markAllAsRead()}
                  className="inline-flex items-center gap-1 text-xs text-amber-600 transition hover:text-amber-700"
                >
                  <CheckCheck className="h-4 w-4" />
                  Marcar todas
                </button>
              </div>

              {/* Filters */}
              <div className="flex gap-2 border-b border-stone-100 px-4 py-3">
                {filters.map((item) => (
                  <button
                    key={item}
                    onClick={() => setFilter(item)}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                      filter === item
                        ? 'bg-amber-600 text-white'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              {/* List */}
              <div className="max-h-[420px] overflow-y-auto">
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2 px-4 py-8 text-sm text-stone-500">
                    <Loader2 className="h-4 w-4 animate-spin text-amber-600" />
                    Cargando notificaciones...
                  </div>
                ) : error ? (
                  <div className="px-4 py-8 text-center">
                    <p className="text-sm text-red-500">{error}</p>
                    <button
                      onClick={() => void refreshNotifications(filter)}
                      className="mt-3 rounded border border-stone-300 px-3 py-1 text-sm text-stone-700 transition hover:bg-stone-50"
                    >
                      Reintentar
                    </button>
                  </div>
                ) : visibleNotifications.length === 0 ? (
                  <p className="px-4 py-8 text-center text-sm text-stone-500">
                    No hay notificaciones
                  </p>
                ) : (
                  <>
                    {visibleNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`border-b border-stone-100 px-4 py-3 last:border-b-0 transition ${
                          notification.status === 'no leida'
                            ? 'bg-amber-50'
                            : 'bg-white hover:bg-stone-50'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <h4 className="truncate text-sm font-semibold text-stone-900">
                              {notification.title?.trim() || '(Sin título)'}
                            </h4>

                            <p className="mt-1 text-sm text-stone-600">
                              {notification.description?.trim() || '(Sin descripción disponible)'}
                            </p>

                            <span
                              className={`mt-2 inline-block text-[10px] font-medium uppercase tracking-wide ${
                                notification.status === 'no leida'
                                  ? 'text-amber-600'
                                  : 'text-stone-400'
                              }`}
                            >
                              {notification.status}
                            </span>
                          </div>

                          <div className="flex shrink-0 items-center gap-2">
                            {notification.status === 'no leida' ? (
                              <button
                                onClick={() => void markAsRead(notification.id)}
                                className="text-xs text-amber-600 transition hover:text-amber-700"
                              >
                                Leer
                              </button>
                            ) : null}

                            <button
                              onClick={() => void deleteNotification(notification.id)}
                              className="text-stone-400 transition hover:text-red-500"
                              aria-label="Eliminar notificación"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {hasMore ? <div ref={loadMoreRef} className="h-6 w-full" /> : null}

                    {isLoadingMore ? (
                      <p className="border-t border-stone-100 px-4 py-3 text-center text-sm text-stone-500">
                        Cargando más...
                      </p>
                    ) : null}
                  </>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-stone-100 px-4 py-3 text-center">
                <Link
                  href="/notificaciones"
                  className="text-sm font-medium text-amber-600 transition hover:text-amber-700"
                >
                  Ver todas las notificaciones
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  )
}
