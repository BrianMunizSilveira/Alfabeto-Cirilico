import React, { useMemo } from 'react'

export function Footer() {
  // Constantes estáticas criadas fora do componente para evitar recriações em cada render
  const socialLinks = useMemo(() => [
    {
      name: 'GitHub',
      icon: '🔗',
      url: 'https://github.com/BrianMunizSilveira/alfabeto-cirilico',
      description: 'Código fonte'
    },
    {
      name: 'Email',
      icon: '✉️',
      url: 'mailto:brian.muniz.silveira@gmail.com',
      description: 'Entre em contato'
    }
  ], [])

  const quickLinks = useMemo(() => [
    {
      name: 'Alfabeto Completo',
      icon: '📚',
      url: '#alfabeto'
    },
    {
      name: 'Modo Prática',
      icon: '🏆',
      url: '#pratica'
    },
    {
      name: 'Teste seus Conhecimentos',
      icon: '👥',
      url: '#teste'
    }
  ], [])

  const stats = useMemo(() => [
    { label: '33 Letras', value: 'Alfabeto Completo' },
    { label: '3 Modos', value: 'de Aprendizado' },
    { label: '100%', value: 'Gratuito' }
  ], [])

  // currentYear muda a cada ano, podemos calcular uma vez e memoizar
  const currentYear = useMemo(() => new Date().getFullYear(), [])

  return (
    <footer className='footer-enhanced'>
      <div className='footer-content'>
        <div className='footer-grid'>
          <div className='footer-section'>
            <div className='footer-brand'>
              <div className='brand-icon'>
                <span className='cyrillic-letter'>А</span>
              </div>
              <h3>Aprendendo Russo</h3>
              <p className='brand-subtitle'>Alfabeto Cirílico</p>
            </div>
            <p className='footer-description'>
              Uma ferramenta interativa e gratuita para aprender o alfabeto
              cirílico russo. Pratique com flashcards, teste seus conhecimentos
              e domine as 33 letras do alfabeto russo.
            </p>
            <div className='learning-tip'>
              <span className='tip-icon'>☕</span>
              <span>
                Dica: Pratique 10 minutos por dia para melhores resultados!
              </span>
            </div>
          </div>

          <div className='footer-section'>
            <h4>📍 Navegação</h4>
            <ul className='footer-links'>
              {quickLinks.map((link) => (
                <li key={link.url}>
                  <a href={link.url} className='footer-link'>
                    <span className='link-icon'>{link.icon}</span>
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className='footer-section'>
            <h4>📊 Sobre a página</h4>
            <div className='stats-grid'>
              {stats.map((stat) => (
                <div key={stat.label} className='stat-item'>
                  <div className='stat-value'>{stat.label}</div>
                  <div className='stat-label'>{stat.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className='footer-section'>
            <h4>🤝 Conecte-se</h4>
            <p className='contact-description'>
              Tem sugestões ou encontrou algum problema? Entre em contato!
            </p>
            <div className='social-links'>
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className='social-link'
                  title={social.description}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <span className='social-icon'>{social.icon}</span>
                  <span>{social.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className='footer-bottom'>
        <div className='footer-bottom-content'>
          <div className='copyright'>
            <span className='open-source'>
              <span className='opensource-icon'>🔓</span>
              Open Source {currentYear} - Aprendendo Russo - Alfabeto Cirílico
            </span>
            <span className='made-with'>
              Feito com <span className='heart-icon'>❤️</span> para estudantes
              de russo
            </span>
          </div>

          <div className='credits'>
            <a
              href='https://www.pexels.com/pt-br/foto/maquina-de-escrever-preta-e-cinza-3519358/'
              target='_blank'
              rel='noopener noreferrer'
              className='photo-credit'
              title='Foto por Stanislav Kondratiev no Pexels'
            >
              <span>Foto: Stanislav Kondratiev</span>
              <span className='external-icon'>↗</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
