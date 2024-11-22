import githubLogo from '@/assets/github.svg';
import linkedinLogo from '@/assets/linkedin.svg';

export function Footer() {
  return (
    <footer className={`w-full h-32 mt-10 `}>
      <div className="container max-w-[1600px] h-full flex gap-4 flex-col sm:flex-row justify-center sm:justify-between items-center text-white">
        <div>
          <ul className="flex gap-3">
            <li>
              <a
                href="https://github.com/DCastro2110"
                target="_blank"
                rel="noreferrer">
                <img
                  className="h-6"
                  src={githubLogo}
                  alt="Logo do Github"
                />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/davi-castro/"
                target="_blank"
                rel="noreferrer">
                <img
                  className="h-6"
                  src={linkedinLogo}
                  alt="Logo do Linkedin"
                />
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p>© {(new Date().getFullYear())} DCFlix. Todos os direitos reservados</p>
        </div>
      </div>
    </footer>
  );
}
