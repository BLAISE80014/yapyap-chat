import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';

const Logo = () => (
  <Link to='/' className='brand-lockup' aria-label='YapYap home'>
    <img className='brand-logo-image' src={`${process.env.PUBLIC_URL}/yapyap-chat-icon.png`} alt='' />
    <span>yapyap</span>
  </Link>
);

function LandingPage() {
  return (
    <div className='landing-page'>
      <header className='landing-nav'>
        <Logo />
        <nav className='landing-links' aria-label='Main navigation'>
          <a href='#features'>Features</a>
          <a href='#privacy'>Privacy</a>
        </nav>
        <div className='landing-actions'>
          <Link className='button button-quiet' to='/login'>Log in</Link>
          <Link className='button button-primary' to='/signup'>Get started <span aria-hidden='true'>↗</span></Link>
          <ThemeToggle />
        </div>
      </header>

      <main>
        <section className='hero-section'>
          <div className='hero-copy'>
            <div className='eyebrow'><span className='eyebrow-dot' /> YOUR PEOPLE, A LITTLE CLOSER</div>
            <h1>Conversations that bring people <span>closer.</span></h1>
            <p>Stay connected with friends, family, and teams through fast, simple, and meaningful conversations.</p>
            <div className='hero-actions'>
              <Link className='button button-primary button-large' to='/signup'>Start chatting <span aria-hidden='true'>→</span></Link>
              <Link className='hero-login' to='/login'>I already have an account</Link>
            </div>
            <div className='hero-note'><span className='online-dot' /> Private conversations. Your way.</div>
          </div>
          <div className='hero-art' aria-label='YapYap chat preview'>
            <div className='orbit orbit-one' />
            <div className='orbit orbit-two' />
            <div className='preview-window'>
              <div className='preview-topbar'><span /><span /><span /><div>weekend plans</div><b>•••</b></div>
              <div className='preview-date'>TODAY · 10:42 AM</div>
              <div className='preview-message message-in'>
                <span className='preview-avatar avatar-peach'>S</span>
                <div><small>Sarah</small><p>We still on for Saturday? <span role='img' aria-label='plant'>🌿</span></p></div>
              </div>
              <div className='preview-message message-out'><p>Wouldn’t miss it. Coffee’s on me <span role='img' aria-label='coffee'>☕</span></p><small>Delivered <span>✓✓</span></small></div>
              <div className='preview-message message-in'>
                <span className='preview-avatar avatar-blue'>J</span>
                <div><small>James</small><p>Already counting down <span role='img' aria-label='smiling'>😄</span></p></div>
              </div>
              <div className='preview-compose'><span>Write a message...</span><b>↑</b></div>
            </div>
            <div className='floating-note'><span className='online-dot' /> Sarah is around</div>
            <div className='floating-sticker'>✦</div>
          </div>
        </section>

        <section className='feature-section' id='features'>
          <div className='section-heading'>
            <div className='eyebrow'>A BETTER WAY TO KEEP IN TOUCH</div>
            <h2>Less noise. <span>More connection.</span></h2>
          </div>
          <div className='feature-grid'>
            <article className='feature-card'>
              <span className='feature-icon icon-purple'>✳</span>
              <h3>It just feels easy</h3>
              <p>Start a conversation in seconds, pick up right where you left off, and keep everything in one calm place.</p>
            </article>
            <article className='feature-card'>
              <span className='feature-icon icon-blue'>↯</span>
              <h3>Here, right now</h3>
              <p>Messages update in real time, so your people never feel far away.</p>
            </article>
            <article className='feature-card' id='privacy'>
              <span className='feature-icon icon-peach'>⌑</span>
              <h3>Made for your circle</h3>
              <p>Your chats belong to you and the people you choose to share them with.</p>
            </article>
          </div>
        </section>
      </main>
      <footer className='landing-footer'><Logo /><span>Connect. Chat. Share. Stay Together.</span><span>© {new Date().getFullYear()} YapYap</span></footer>
    </div>
  );
}

export default LandingPage;
