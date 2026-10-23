import { readdirSync } from 'node:fs';
import { extname, join } from 'node:path';
import LoveSite from '@/components/LoveSite';

const supportedMusicExtensions = new Set(['.aac', '.flac', '.m4a', '.mp3', '.oga', '.ogg', '.opus', '.wav']);

function getMusicTracks() {
  const musicDirectory = join(process.cwd(), 'public', 'music');

  return readdirSync(musicDirectory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && supportedMusicExtensions.has(extname(entry.name).toLowerCase()))
    .map((entry) => ({
      src: `/music/${encodeURIComponent(entry.name)}`,
      title: entry.name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' '),
    }));
}

export default function Home() {
  return <LoveSite musicTracks={getMusicTracks()} />;
}
