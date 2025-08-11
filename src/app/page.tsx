"use client";

import Link from "next/link";
import { Typography, List, Card } from "antd";

const { Title, Paragraph } = Typography;

const projects = [
  {
    title: "Frontend (Next.js)",
    description:
      "Клієнтська частина ToDoList застосунку, створена на базі Next.js та TypeScript. Побудована із використанням компонентів Ant Design для інтерфейсу, а також інтеграція з бекендом для роботи з задачами.",
    link: "https://github.com/lobodnaz/next-js-todolist",
  },
  {
    title: "Backend (ASP.NET Core Web API)",
    description:
      "Серверна частина ToDoList застосунку, реалізована за допомогою ASP.NET Core Web API. Забезпечує CRUD-операції для задач та взаємодію з базою даних SQL Server через Entity Framework Core.",
    link: "https://github.com/lobodnaz/.net-todolist-api",
  },
];

export default function Home() {
  return (
    <>
      <Title
        level={1}
        style={{ textAlign: "center", fontSize: "36px", color: "#f0f0f0" }}
      >
        Про мене
      </Title>

      <section>
        <Title level={2}>Досвід</Title>
        <Paragraph>
          Працював над різноманітними навчальними та особистими проєктами,
          виконуючи завдання як з фронтенду, так і з бекенду, в результаті чого
          набув навички full-stack розробки.
        </Paragraph>
        <Paragraph>
          На даний момент зосереджений на поглибленні знань у фронтенд-розробці
          з використанням React.js та Next.js, а також на освоєння сучасних
          інструментів та підходів в JavaScript.
        </Paragraph>
      </section>

      <section>
        <Title level={2}>Проєкти</Title>
        <List
          grid={{ gutter: 16, column: 2 }}
          dataSource={projects}
          renderItem={(project) => (
            <List.Item>
              <Card title={project.title}>
                <Paragraph>{project.description}</Paragraph>
                <Link href={project.link}>Переглянути на GitHub</Link>
              </Card>
            </List.Item>
          )}
        />
      </section>

      <section>
        <Title level={2}>Навички</Title>
        <Paragraph>
          JavaScript, TypeScript, React.js, Next.js, ASP.NET Core, C#, Entity
          Framework Core, HTML, CSS, Git, REST API, SQL Server, Ant Design
        </Paragraph>
      </section>

      <section>
        <Title level={2}>Контакти</Title>
        <Link href="https://github.com/lobodnaz">GitHub</Link>
      </section>
    </>
  );
}
