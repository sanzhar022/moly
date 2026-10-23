'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export type MusicTrack = {
  src: string;
  title: string;
};

type PlaybackState = 'blocked' | 'error' | 'loading' | 'paused' | 'playing';

export default function MusicPlayer({ tracks }: { tracks: MusicTrack[] }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const playRequestRef = useRef<Promise<void> | null>(null);
  const musicEnabledRef = useRef(true);
  const firstInteractionHandledRef = useRef(false);
  const [selectedTrack, setSelectedTrack] = useState(0);
  const [playbackState, setPlaybackState] = useState<PlaybackState>('paused');
  const [musicEnabled, setMusicEnabled] = useState(true);

  const startPlayback = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || !musicEnabledRef.current || !audio.src || !audio.paused) return;
    if (playRequestRef.current) return playRequestRef.current;

    const request = audio.play();
    playRequestRef.current = request;

    try {
      await request;
      if (!musicEnabledRef.current) audio.pause();
    } catch (error) {
      if (error instanceof DOMException && error.name === 'NotAllowedError') {
        setPlaybackState('blocked');
      } else if (!(error instanceof DOMException && error.name === 'AbortError')) {
        setPlaybackState('error');
      }
    } finally {
      if (playRequestRef.current === request) playRequestRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (tracks.length === 0) return;

    const handleFirstInteraction = () => {
      if (firstInteractionHandledRef.current) return;
      firstInteractionHandledRef.current = true;
      void startPlayback();
    };

    document.addEventListener('pointerdown', handleFirstInteraction, true);
    document.addEventListener('keydown', handleFirstInteraction, true);
    void startPlayback();

    return () => {
      document.removeEventListener('pointerdown', handleFirstInteraction, true);
      document.removeEventListener('keydown', handleFirstInteraction, true);
    };
  }, [startPlayback, tracks.length]);

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      void startPlayback();
    } else {
      audio.pause();
    }
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    const nextEnabled = !musicEnabledRef.current;
    musicEnabledRef.current = nextEnabled;
    setMusicEnabled(nextEnabled);

    if (nextEnabled) {
      void startPlayback();
    } else {
      audio?.pause();
      setPlaybackState('paused');
    }
  };

  if (tracks.length === 0) {
    return (
      <aside className="music-player music-player-unavailable" aria-label="Музыкальный плеер">
        <span className="music-player-heart" aria-hidden="true">♡</span>
        <span>Добавь музыку в <code>public/music</code></span>
      </aside>
    );
  }

  const activeTrack = tracks[selectedTrack];
  const statusLabel = !musicEnabled
    ? 'Музыка выключена'
    : playbackState === 'playing'
      ? 'Сейчас играет'
      : playbackState === 'loading'
        ? 'Загрузка музыки…'
        : playbackState === 'blocked'
          ? 'Нажми, чтобы включить'
          : playbackState === 'error'
            ? 'Не удалось загрузить трек'
            : 'На паузе';

  return (
    <aside className="music-player" aria-label="Музыкальный плеер">
      <audio
        ref={audioRef}
        src={activeTrack.src}
        autoPlay
        loop
        preload="auto"
        onPlay={() => setPlaybackState('playing')}
        onPause={() => setPlaybackState('paused')}
        onWaiting={() => setPlaybackState('loading')}
        onError={() => setPlaybackState('error')}
      />
      <div className="music-player-heading">
        <span className={`music-player-heart ${playbackState === 'playing' && musicEnabled ? 'music-playing' : ''}`} aria-hidden="true">♫</span>
        <div className="music-player-copy">
          <span className="music-player-title">{activeTrack.title}</span>
          <span className="music-player-status" aria-live="polite">{statusLabel}</span>
        </div>
      </div>
      <div className="music-player-controls">
        <button
          type="button"
          onClick={togglePlayback}
          disabled={!musicEnabled}
          aria-label={playbackState === 'playing' ? 'Поставить музыку на паузу' : 'Включить музыку'}
        >
          {playbackState === 'playing' ? 'Пауза' : playbackState === 'blocked' ? 'Включить нашу музыку' : 'Играть'}
        </button>
        {tracks.length > 1 && (
          <select
            value={selectedTrack}
            onChange={(event) => setSelectedTrack(Number(event.target.value))}
            aria-label="Выбрать музыкальный трек"
          >
            {tracks.map((track, index) => <option key={track.src} value={index}>{track.title}</option>)}
          </select>
        )}
        <button type="button" className="music-disable" onClick={toggleMusic}>
          {musicEnabled ? 'Выкл.' : 'Включить'}
        </button>
      </div>
    </aside>
  );
}
