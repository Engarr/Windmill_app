import classes from './AboutUs.module.scss';

const AboutUs = () => {
  return (
    <div className={classes.wrapper}>
      <h2>O nas</h2>
      <h3>
        Jesteśmy firmą skupującą zboże oraz producentem wysokiej jakości
        przetworów zbożowych od 1962 roku.
      </h3>
      <div>
        <p>
          Nasza historia jest długa i bogata w doświadczenia, które
          wykorzystujemy do produkcji najlepszych produktów na rynku. Nasza
          firma skupuje zboże od lokalnych rolników, którzy dbają o jakość
          swoich plonów. Dzięki temu mamy pewność, że nasze produkty są wykonane
          z najlepszych surowców. Stawiamy na nowoczesne technologie produkcji,
          które pozwalają nam zachować najwyższe standardy jakości i
          bezpieczeństwa żywności. W naszej ofercie znajdziecie m.in. mąki,
          płatki śniadaniowe, kasze, mieszanki do wypieku chleba oraz wiele
          innych produktów.
        </p>
        <p>
          Jako firma działająca na rynku od ponad 60 lat, wiemy jak ważne są
          zrównoważone relacje z naszymi klientami. Dlatego stawiamy na wysoką
          jakość produktów oraz profesjonalną obsługę. Nasi klienci mogą liczyć
          na fachowe doradztwo oraz pomoc w doborze odpowiednich produktów do
          swoich potrzeb.
        </p>
        <p>
          Dbamy o ochronę środowiska i zrównoważony rozwój. Staramy się
          minimalizować nasz wpływ na środowisko naturalne oraz wspierać lokalną
          społeczność. Nasze inicjatywy obejmują m.in. redukcję zużycia energii,
          zwiększenie udziału produktów ekologicznych w ofercie oraz wspieranie
          lokalnych rolników.
        </p>
        <p>
          Zapraszamy do zapoznania się z naszą ofertą oraz kontaktu z nami.
          Chętnie odpowiemy na Wasze pytania oraz pomożemy w doborze najlepszych
          produktów.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
