# SmartGarden

O projeto em questão é um sistema de monitoramento de jardins domésticos que utiliza a tecnologia de "gêmeos digitais" para criar uma representação virtual dos processos físicos de um jardim. O sistema emprega um microcontrolador ESP32 equipado com vários sensores para coletar dados ambientais, como temperatura e umidade. Esses dados são enviados via Wi-Fi ou Bluetooth para um servidor Raspberry Pi, que atua como um hub central.

A Raspberry Pi agrega os dados e os disponibiliza através de uma API RESTful, que pode ser acessada por um frontend, como uma aplicação web ou móvel, permitindo aos usuários visualizar e monitorar o estado do jardim em tempo real. A API fornece respostas em JSON com informações detalhadas sobre cada sensor, incluindo suas últimas leituras e o horário em que foram atualizadas.

O objetivo final do sistema é oferecer aos usuários uma maneira conveniente e eficiente de manter a saúde de seus jardins, aproveitando as vantagens dos dispositivos IoT (Internet das Coisas) para coleta e análise de dados. Este tipo de aplicativo tem potencial para ser expandido com funcionalidades adicionais, como automação de irrigação, detecção de pragas e recomendações de cuidados com as plantas, transformando a jardinagem em uma experiência mais gerenciável e científica.

![img](https://github.com/Markoro-Original/SmartGarden/assets/80073676/9dcf16bb-6058-4a5e-991f-ef7e5543460c)

<img src="https://github.com/Markoro-Original/SmartGarden/assets/80073676/9dcf16bb-6058-4a5e-991f-ef7e5543460c.png" alt="Logo da Minha Empresa">
