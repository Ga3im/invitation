import { useState, useRef } from 'react';
import { Calendar, MapPin, Clock, Download } from 'lucide-react';
import './App.css';

export default function App() {
  const [guestName, setGuestName] = useState<string>('');
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const downloadAsImage = async () => {
    if (cardRef.current === null) return;
    const { toPng } = await import('html-to-image');
    
    setIsDownloading(true);
    // Небольшая задержка, чтобы браузер успел зафиксировать слои фона перед фото
    await new Promise((resolve) => setTimeout(resolve, 120));

    toPng(cardRef.current, { 
      quality: 1.0,
      pixelRatio: 3, // Тройное разрешение для четкости в мессенджерах
      cacheBust: true,
    })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = guestName ? `saqyryu-${guestName}.png` : 'saqyryu.png';
        link.href = dataUrl;
        link.click();
        setIsDownloading(false);
      })
      .catch((err) => {
        console.error('Ошибка сохранения:', err);
        setIsDownloading(false);
      });
  };

  return (
    <div className="wrapper">
      {/* Панель ввода имени (не идет на фото) */}
      <div className="generator-panel">
        <input 
          type="text" 
          placeholder="Ҡунаҡтың исемен яҙығыҙ (Имя гостя)" 
          className="generator-input"
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
        />
      </div>

      {/* ОТКРЫТКА */}
      <div ref={cardRef} className="invitation-card">
        
        <h2 className="guest-greeting">
          {guestName.trim() ? `Хөрмәтле ${guestName}!` : 'Хөрмәтле ҡунаҡтар!'}
        </h2>

        <h1 className="title">
          <span className="name">ЗЕМФИРА һәм ДӘҮЛӘТБАЙҘЫҢ</span>
          60 йәшлек күркәм юбилей тантанаһына саҡырабыҙ!
        </h1>
        
        {/* <div className="divider"></div> */}

        <div className="info-container">
          <div className="info-item">
            <Calendar size={26} color="#b38600" />
            <h3>Ваҡыты</h3>
            <p>2026 йылдың 6 июне</p>
            <p className="address">Шәмбе</p>
          </div>

          <div className="info-item">
            <Clock size={26} color="#b38600" />
            <h3>Башлана</h3>
            <p>Сәғәт 17:00</p>
          </div>

          <div className="info-item">
            <MapPin size={26} color="#b38600" />
            <h3>Үткәреү урыны</h3>
            <p>Ибрай ауылы</p>
            <p className="address">Урмансы урамы, 24-се йорт</p>
          </div>
        </div>

        <p className="footer-text">Һеҙҙе шатлыҡлы байрамыбыҙҙа көтөп ҡалабыҙ!</p>
      </div>

      {/* Кнопка сохранения (не идет на фото) */}
      <button onClick={downloadAsImage} className="download-button" style={{ marginTop: '25px' }}>
        <Download size={18} />
        Фото итеп һаҡларға (Сохранить как фото)
      </button>
    </div>
  );
}
