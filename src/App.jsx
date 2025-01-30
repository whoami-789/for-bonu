import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

// Анимация движения смайликов в разные стороны
const floatAnimation = keyframes`
    from {
        transform: translate(0, 0) scale(1);
        opacity: 1;
    }
    to {
        transform: translate(
                ${() => Math.random() * 100 - 50}px,
                ${() => Math.random() * -100 - 50}vh
        ) scale(${() => Math.random() * 1.5 + 0.5});
        opacity: 0;
    }
`;

// Элемент смайлика
const Emoji = styled.div`
  position: absolute;
  font-size: ${({ size }) => size}rem;
  left: ${({ left }) => left}%;
  top: ${({ top }) => top}%;
  animation: ${floatAnimation} ${({ duration }) => duration}s linear forwards;
`;

// Контейнер для всего приложения
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%);
    font-family: "Arial", sans-serif;
    text-align: center;
    position: relative;
    overflow: hidden; /* Чтобы смайлы не выходили за границы экрана */
`;

// Карточка с текстом и кнопкой
const Card = styled.div`
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    text-align: center;
`;

// Кнопка
const Button = styled.button`
    margin-top: 20px;
    padding: 10px 20px;
    border: none;
    background-color: #ff6b81;
    color: white;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
        background-color: #ff4757;
    }
`;

// Милые фразы
const sweetMessages = [
    "Ты делаешь этот мир светлее 😊",
    "Ты — человек, который может осветить даже самый серый день ✨",
    "Если бы я мог загадать одно желание — я бы пожелал видеть твою улыбку чаще ❤️",
    "Ты — самое приятное уведомление в моём телефоне 😊",
    "Мне просто хорошо, когда ты рядом",
    "Каждый раз, когда ты пишешь, мой день становится лучше 💖",
    "Ты — как уютный плед в холодный день, тепло и приятно 💛",
    "С тобой даже обычный день становится особенным 💕",
    "Ты заслуживаешь только самое лучшее, и я надеюсь, что ты это знаешь ✨",
    "Я просто рад, что ты есть ❤️"
];

// Смайлы, которые будут летать
const emojis = ["❤️", "💖", "😊", "✨", "🥰", "💛", "💕", "😍"];

const App = () => {
    const [message, setMessage] = useState(sweetMessages[0]);
    const [floatingEmojis, setFloatingEmojis] = useState([]);

    // Функция добавления нового смайлика
    const addFloatingEmoji = () => {
        const newEmoji = {
            id: Date.now(),
            emoji: emojis[Math.floor(Math.random() * emojis.length)],
            left: Math.random() * 100, // Случайное положение по ширине
            top: Math.random() * 100, // Случайное положение по высоте
            size: Math.random() * 1.5 + 1, // Случайный размер
            duration: Math.random() * 5 + 3 // Разная скорость анимации
        };

        setFloatingEmojis((prev) => [...prev, newEmoji]);

        // Удаляем смайлик через 5-8 секунд, чтобы не перегружать страницу
        setTimeout(() => {
            setFloatingEmojis((prev) => prev.filter((e) => e.id !== newEmoji.id));
        }, newEmoji.duration * 1000);
    };

    // Запускаем бесконечный поток смайликов каждую секунду
    useEffect(() => {
        const interval = setInterval(() => {
            addFloatingEmoji();
        }, 1000); // Каждую секунду добавляется новый смайл

        return () => clearInterval(interval);
    }, []);

    return (
        <Container>
            {/* Летающие смайлики */}
            {floatingEmojis.map((e) => (
                <Emoji
                    key={e.id}
                    left={e.left}
                    top={e.top}
                    size={e.size}
                    duration={e.duration}
                >
                    {e.emoji}
                </Emoji>
            ))}

            {/* Карточка с текстом и кнопкой */}
            <Card>
                <h2>{message}</h2>
                <Button onClick={() => setMessage(sweetMessages[Math.floor(Math.random() * sweetMessages.length)])}>
                    Нажми меня
                </Button>
            </Card>
        </Container>
    );
};

export default App;
