'use client';

import Image from 'next/image';
import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import MusicPlayer, { type MusicTrack } from '@/components/MusicPlayer';
import { loveLetter, memories, reasons } from '@/data/content';

const floaters = [
  { text: '♡', className: 'floater floater-one' },
  { text: '✿', className: 'floater floater-two' },
  { text: '♡', className: 'floater floater-three' },
  { text: '✧', className: 'floater floater-four' },
  { text: '♡', className: 'floater floater-five' },
];

const sectionLinks = [
  ['moments', 'Наши моменты'],
  ['letter', 'Письмо'],
  ['reasons', 'Почему ты'],
  ['surprise', 'Сюрприз'],
] as const;

export default function LoveSite({ musicTracks }: { musicTracks: MusicTrack[] }) {
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [openedReasons, setOpenedReasons] = useState<number[]>([]);
  const [surpriseOpened, setSurpriseOpened] = useState(false);
  const [activePhoto, setActivePhoto] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  const revealReason = (index: number) => {
    setOpenedReasons((current) => current.includes(index) ? current : [...current, index]);
  };

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });

  return (
    <main className="site-shell">
      <MusicPlayer tracks={musicTracks} />
      <div className="ambient-bg" aria-hidden="true" />
      {floaters.map((item, index) => (
        <motion.span
          key={item.className}
          className={item.className}
          aria-hidden="true"
          animate={reduceMotion ? undefined : { y: [0, -14, 0], rotate: [0, index % 2 ? 9 : -9, 0] }}
          transition={{ duration: 4 + index * 0.6, repeat: Infinity, ease: 'easeInOut', delay: index * 0.35 }}
        >{item.text}</motion.span>
      ))}

      <header className="topbar">
        <a className="brand" href="#home" aria-label="В начало">m<span>♡</span>lia</a>
        <nav className="desktop-nav" aria-label="Разделы сайта">
          {sectionLinks.map(([id, label]) => <button key={id} onClick={() => scrollTo(id)}>{label}</button>)}
        </nav>
        <span className="topbar-note">сделано с любовью ♡</span>
      </header>

      <section id="home" className="hero section-wrap">
        <motion.div
          className="hero-copy"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
        >
          <span className="eyebrow"><span className="eyebrow-dot" /> маленький подарок только для тебя</span>
          <h1>Моля,<br />это <em>для тебя.</em></h1>
          <p className="hero-description">Небольшой уголок с тёплыми словами, нашими фотографиями и сюрпризом в конце. Просто потому, что ты мне дорога.</p>
          <div className="hero-actions">
            <button className="button button-primary" onClick={() => scrollTo('envelope')}>Открыть подарок <span aria-hidden="true">↗</span></button>
            <span className="tiny-note">листай в своём темпе ♡</span>
          </div>
          <div className="hero-sticker sticker-note" aria-label="Наклейка с сердцем"><span>made with</span><b>♡</b><span>love</span></div>
        </motion.div>

        <motion.div
          className="hero-art"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.92, rotate: 3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
        >
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <div className="hero-flower flower-left">✿</div>
          <div className="hero-flower flower-right">✿</div>
          <div className="hero-heart-card">
            <div className="heart-sparkle sparkle-a">✧</div>
            <div className="heart-sparkle sparkle-b">✦</div>
            <div className="big-heart" aria-hidden="true">♥</div>
            <div className="hero-card-caption">for my favorite girl</div>
          </div>
          <div className="hero-sticker sticker-smile">☺ <span>ты чудо!</span></div>
          <div className="hero-sticker sticker-flower">✿</div>
          <div className="hero-sticker sticker-love">xoxo<br /><b>♡</b></div>
        </motion.div>
      </section>

      <section id="envelope" className="envelope-section section-wrap">
        <div className="section-heading centered">
          <span className="eyebrow">01 — открой, когда захочешь</span>
          <h2>У меня есть кое-что <em>для тебя</em></h2>
          <p>Нажми на конверт. Внутри — несколько слов, которые я хотел тебе сказать.</p>
        </div>
        <div className="envelope-stage">
          <motion.button
            type="button"
            className={`envelope ${envelopeOpened ? 'is-open' : ''}`}
            onClick={() => setEnvelopeOpened((value) => !value)}
            whileHover={reduceMotion ? undefined : { y: -5, rotate: -1 }}
            whileTap={{ scale: 0.98 }}
            aria-expanded={envelopeOpened}
            aria-label={envelopeOpened ? 'Закрыть письмо' : 'Открыть письмо'}
          >
            <span className="envelope-back" />
            <AnimatePresence>
              {envelopeOpened && <motion.span className="letter-peek" initial={{ y: 30, opacity: 0 }} animate={{ y: -55, opacity: 1 }} exit={{ y: 20, opacity: 0 }} transition={{ duration: 0.45 }}><span>Моля, ♡</span><small>для тебя</small></motion.span>}
            </AnimatePresence>
            <span className="envelope-front" />
            <motion.span className="envelope-flap" animate={envelopeOpened ? { rotateX: 180 } : { rotateX: 0 }} transition={{ duration: 0.55 }} />
            <motion.span className="envelope-seal" animate={envelopeOpened ? { scale: 0.8, opacity: 0.35 } : { scale: 1, opacity: 1 }}>♥</motion.span>
          </motion.button>
          <p className="envelope-hint">{envelopeOpened ? 'Письмо открыто — загляни внутрь ♡' : 'нажми на конверт, чтобы открыть ♡'}</p>
          <AnimatePresence>
            {envelopeOpened && <motion.button className="text-link" onClick={() => scrollTo('letter')} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ delay: 0.15 }}>Перейти к письму <span>↓</span></motion.button>}
          </AnimatePresence>
        </div>
      </section>

      <section id="moments" className="memories-section section-wrap">
        <div className="section-heading">
          <span className="eyebrow">02 — маленький фотоальбом</span>
          <h2>Наши <em>моменты</em></h2>
          <p>Здесь будут фотографии, которые хочется пересматривать. Нажми на карточку, чтобы рассмотреть её поближе.</p>
        </div>
        <div className="memory-grid">
          {memories.map((memory, index) => (
            <motion.button
              type="button"
              className={`memory-card memory-card-${index + 1}`}
              key={memory.image}
              onClick={() => setActivePhoto(index)}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              whileHover={reduceMotion ? undefined : { y: -7, rotate: index === 1 ? 1 : -1 }}
            >
              <span className="photo-frame"><Image src={memory.image} alt={memory.label} fill sizes="(max-width: 700px) 85vw, 30vw" /></span>
              <span className="photo-label">{memory.label} <span>♡</span></span>
              <span className="photo-caption">{memory.caption}</span>
              <span className="tape" aria-hidden="true" />
            </motion.button>
          ))}
        </div>
        <p className="edit-tip"><span>✿</span> Подсказка: замени заглушки своими фотографиями — инструкция есть в README.</p>
      </section>

      <section id="letter" className="letter-section section-wrap">
        <div className="letter-deco deco-heart" aria-hidden="true">♡</div>
        <div className="letter-deco deco-flower" aria-hidden="true">✿</div>
        <div className="letter-paper">
          <div className="paper-top"><span>НЕСКОЛЬКО СЛОВ ДЛЯ ТЕБЯ</span><span>♡</span></div>
          <h2>Моя Моля,</h2>
          <p className="letter-intro">это письмо — маленькая частичка того, что я чувствую.</p>
          <div className="letter-body">{loveLetter.split('\n').map((line, index) => line ? <p key={`${line}-${index}`}>{line}</p> : <div key={`space-${index}`} className="letter-space" />)}</div>
          <div className="letter-signature">С теплом, <span>твой человек ♡</span></div>
          <div className="paper-stamp" aria-hidden="true">для<br />тебя</div>
        </div>
      </section>

      <section id="reasons" className="reasons-section section-wrap">
        <div className="section-heading centered">
          <span className="eyebrow">03 — маленькие признания</span>
          <h2>Почему <em>ты</em>?</h2>
          <p>Открывай по одной карточке. Каждая хранит маленькое признание.</p>
        </div>
        <div className="reasons-grid">
          {reasons.map((reason, index) => {
            const opened = openedReasons.includes(index);
            return (
              <motion.button
                type="button"
                key={reason}
                className={`reason-card ${opened ? 'reason-open' : ''}`}
                onClick={() => revealReason(index)}
                whileHover={reduceMotion ? undefined : { y: -4 }}
                whileTap={{ scale: 0.98 }}
                aria-expanded={opened}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {opened ? (
                    <motion.span className="reason-reveal" key="reveal" initial={{ opacity: 0, rotateY: -70 }} animate={{ opacity: 1, rotateY: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                      <span className="reason-number">{String(index + 1).padStart(2, '0')} / 06</span>
                      <span className="reason-text">{reason}</span>
                      <span className="reason-heart">♥</span>
                    </motion.span>
                  ) : (
                    <motion.span className="reason-closed" key="closed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <span className="reason-number">МАЛЕНЬКИЙ СЕКРЕТ № {index + 1}</span>
                      <span className="reason-big-heart">♡</span>
                      <span className="reason-tap">нажми, чтобы открыть</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>
        <p className="reasons-progress">Открыто {openedReasons.length} из {reasons.length} признаний <span aria-hidden="true">♡</span></p>
      </section>

      <section id="surprise" className="surprise-section section-wrap">
        <div className="surprise-card">
          <div className="surprise-spark spark-one" aria-hidden="true">✦</div>
          <div className="surprise-spark spark-two" aria-hidden="true">✧</div>
          <span className="eyebrow">04 — самый последний сюрприз</span>
          <AnimatePresence mode="wait">
            {!surpriseOpened ? (
              <motion.div className="surprise-content" key="closed" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <div className="gift-illustration" aria-hidden="true"><span className="gift-bow">♡</span><span className="gift-box">🎁</span><span className="gift-heart">♥</span></div>
                <h2>И последнее…</h2>
                <p>Тут спрятано ещё одно маленькое послание. Готова?</p>
                <button className="button button-primary" onClick={() => setSurpriseOpened(true)}>Открыть сюрприз <span>♡</span></button>
              </motion.div>
            ) : (
              <motion.div className="surprise-content surprise-reveal" key="open" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 180, damping: 15 }}>
                <div className="final-heart" aria-hidden="true">♥</div>
                <h2>Это только <em>начало.</em></h2>
                <p>Я рад, что мы встретились, Моля. Пусть впереди у нас будет много тёплых моментов, искренних улыбок и поводов быть рядом.</p>
                <p className="final-note">Увидимся — и я обниму тебя крепко-крепко. ♡</p>
                <div className="confetti-hearts" aria-hidden="true">♡　✿　♥　✧　♡</div>
                <button className="text-link" onClick={() => { setSurpriseOpened(false); scrollTo('surprise'); }}>Посмотреть ещё раз ↻</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <footer className="footer">
        <a className="footer-heart" href="#home" aria-label="Наверх">♡</a>
        <p>Создано с любовью, специально для Моли.</p>
        <span>маленький сайт · большое тепло</span>
      </footer>

      <AnimatePresence>
        {activePhoto !== null && (
          <motion.div className="lightbox" role="dialog" aria-modal="true" aria-label="Фотография и подпись" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActivePhoto(null)}>
            <motion.div className="lightbox-card" initial={{ scale: 0.92, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 10 }} onClick={(event) => event.stopPropagation()}>
              <button className="lightbox-close" onClick={() => setActivePhoto(null)} aria-label="Закрыть фотографию">×</button>
              <div className="lightbox-image"><Image src={memories[activePhoto].image} alt={memories[activePhoto].label} fill sizes="(max-width: 700px) 90vw, 600px" /></div>
              <span className="eyebrow">{memories[activePhoto].label}</span>
              <p>{memories[activePhoto].caption}</p>
              <button className="text-link" onClick={() => setActivePhoto((activePhoto + 1) % memories.length)}>Следующий момент →</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
