(function () {
  'use strict';

  const VERSION = '1.3.0';
  const PRODUCT_VERSION = '1.3.0';
  const EVENT_KEY = 'muduo-events-v1';
  const DIAG_KEY = 'muduo-diag-v1';
  const SESSION_KEY = 'muduo-session-v1';
  const MAX_EVENTS = 1000;
  const MAX_DIAGNOSTICS = 50;

  function readJson(key, fallback) {
    try {
      const value = JSON.parse(localStorage.getItem(key) || 'null');
      return value === null ? fallback : value;
    } catch (error) {
      return fallback;
    }
  }

  function writeJson(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      return false;
    }
  }

  function sessionId() {
    try {
      let id = sessionStorage.getItem(SESSION_KEY);
      if (!id) {
        if (window.crypto && typeof window.crypto.randomUUID === 'function') {
          id = window.crypto.randomUUID();
        } else {
          id = `s-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
        }
        sessionStorage.setItem(SESSION_KEY, id);
      }
      return id;
    } catch (error) {
      return `s-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
    }
  }

  function uaCode() {
    const ua = navigator.userAgent || '';
    const ios = /iPhone|iPad|iPod/i.test(ua);
    const android = /Android/i.test(ua);
    if (/MicroMessenger/i.test(ua)) return ios ? 'wechat-ios' : android ? 'wechat-android' : 'wechat-desktop';
    if (ios) return 'safari-ios';
    if (android) return 'chrome-android';
    if (/Edg\//i.test(ua)) return 'edge-desktop';
    if (/Chrome\//i.test(ua)) return 'chrome-desktop';
    if (/Safari\//i.test(ua)) return 'safari-desktop';
    return 'other';
  }

  function query() {
    return new URLSearchParams(location.search);
  }

  function defaultScreen() {
    return /share\.html$/i.test(location.pathname) ? 'share' : 'title';
  }

  function defaultMode() {
    const params = query();
    if (params.has('d')) return 'share-open';
    return params.get('mode') || 'title';
  }

  function referrerHost() {
    if (!document.referrer) return '';
    try {
      return new URL(document.referrer).hostname.slice(0, 80);
    } catch (error) {
      return '';
    }
  }

  function safeValue(value) {
    if (value === null || value === undefined) return value;
    if (Array.isArray(value)) return value.slice(0, 40).map(safeValue);
    if (typeof value === 'object') {
      const result = {};
      Object.keys(value).slice(0, 30).forEach(key => {
        result[key] = safeValue(value[key]);
      });
      return result;
    }
    if (typeof value === 'string') return value.slice(0, 240);
    return value;
  }

  function track(event, details) {
    if (!event) return null;
    const extra = details && typeof details === 'object' ? details : {};
    const entry = {
      ts: new Date().toISOString(),
      sid: sessionId(),
      ver: VERSION,
      mode: extra.mode || defaultMode(),
      screen: extra.screen || defaultScreen(),
      ua: uaCode(),
      event,
      ...safeValue(extra)
    };
    const queue = readJson(EVENT_KEY, []);
    const events = Array.isArray(queue) ? queue : [];
    events.push(entry);
    writeJson(EVENT_KEY, events.slice(-MAX_EVENTS));
    return entry;
  }

  function pushDiagnostic(type, error) {
    let message = '';
    let stack = '';
    if (error instanceof Error) {
      message = error.message;
      stack = error.stack || '';
    } else if (typeof error === 'string') {
      message = error;
    } else if (error && typeof error === 'object') {
      message = error.message || error.reason || String(error);
      stack = error.stack || '';
    } else {
      message = String(error || '');
    }
    const queue = readJson(DIAG_KEY, []);
    const diagnostics = Array.isArray(queue) ? queue : [];
    diagnostics.push({
      ts: new Date().toISOString(),
      sid: sessionId(),
      ver: VERSION,
      type,
      screen: defaultScreen(),
      message: String(message).slice(0, 500),
      stack: String(stack).slice(0, 1400)
    });
    writeJson(DIAG_KEY, diagnostics.slice(-MAX_DIAGNOSTICS));
  }

  function getEvents() {
    const events = readJson(EVENT_KEY, []);
    return Array.isArray(events) ? events : [];
  }

  function getDiagnostics() {
    const diagnostics = readJson(DIAG_KEY, []);
    return Array.isArray(diagnostics) ? diagnostics : [];
  }

  function summarize(events) {
    const counts = {};
    const sessions = new Set();
    events.forEach(event => {
      if (!event || !event.event) return;
      counts[event.event] = (counts[event.event] || 0) + 1;
      if (event.sid) sessions.add(event.sid);
    });
    return {
      event_count: events.length,
      session_count: sessions.size,
      first_event_at: events.length ? events[0].ts : null,
      last_event_at: events.length ? events[events.length - 1].ts : null,
      event_counts: counts
    };
  }

  function exportData() {
    const events = getEvents();
    const diagnostics = getDiagnostics();
    return {
      product: '木铎声里',
      schema: 'muduo-local-trial-v1',
      ver: VERSION,
      product_ver: PRODUCT_VERSION,
      exported_at: new Date().toISOString(),
      session_id: sessionId(),
      ua: uaCode(),
      privacy: '本地试玩记录，仅保存在当前浏览器；不含姓名、学号或玩家输入。',
      summary: summarize(events),
      events,
      diagnostics,
      feedback: (() => { try { return JSON.parse(localStorage.getItem('muduo-feedback-v1') || '[]'); } catch (e) { return []; } })()
    };
  }

  function downloadData() {
    const data = exportData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `木铎声里-试玩记录-${VERSION}-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1200);
    return data;
  }

  function fallbackCopy(text) {
    try {
      const area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.left = '-9999px';
      document.body.appendChild(area);
      area.select();
      const copied = document.execCommand('copy');
      area.remove();
      return copied;
    } catch (error) {
      return false;
    }
  }

  async function copyDiagnostics() {
    const diagnostics = getDiagnostics();
    const summary = summarize(getEvents());
    const lines = [
      `木铎声里 ${VERSION}`,
      `会话：${sessionId()}`,
      `设备：${uaCode()}`,
      `事件：${summary.event_count} 条 / ${summary.session_count} 个会话`,
      `诊断：${diagnostics.length} 条`,
      ''
    ];
    if (diagnostics.length) {
      diagnostics.forEach(item => {
        lines.push(`[${item.ts}] ${item.type}: ${item.message}`);
        if (item.stack) lines.push(item.stack);
      });
    } else {
      lines.push('当前浏览器没有记录到脚本异常。');
    }
    const text = lines.join('\n');
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (error) {
      pushDiagnostic('clipboard', error);
    }
    return fallbackCopy(text);
  }

  window.addEventListener('error', event => {
    pushDiagnostic('error', event.error || event.message);
  });
  window.addEventListener('unhandledrejection', event => {
    pushDiagnostic('rejection', event.reason);
  });

  window.MUDUO_VER = VERSION;
  window.MUDUO_PRODUCT_VER = PRODUCT_VERSION;
  window.MuduoTelemetry = {
    version: VERSION,
    productVersion: PRODUCT_VERSION,
    track,
    pushDiagnostic,
    getEvents,
    getDiagnostics,
    summarize,
    exportData,
    downloadData,
    copyDiagnostics
  };

  if (!window.__MUDUO_TELEMETRY_BOOTED__) {
    window.__MUDUO_TELEMETRY_BOOTED__ = true;
    const params = query();
    track('session_start', {
      src: params.get('src') || 'direct',
      ref: referrerHost(),
      has_payload: params.has('d')
    });
  }
})();
