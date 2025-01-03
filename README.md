# Geo-Info 🌍

Geo-Info é uma aplicação web que permite obter informações geográficas com base no nome do lugar. Desenvolvido utilizando Next.js e TypeScript, o projeto é rápido, escalável e bem estruturado, com uma interface moderna criada com Tailwind CSS.

## 🎯 Funcionalidades

- **Busca por endereço**: Permite ao usuário inserir um texto para localizar lugares geográficos correspondentes, como países, cidades, estados ou qualquer tipo de localização disponível.
- **Interface intuitiva**: Estalização moderna e respoinsiva com TailwindCSS.
- **Localização no mapa**: Exibe uma marcação no mapa indicando o local selecionado, com funcionalidade interativa para explorar a região diretamente no mapa.
- **Informações meteorologicas**: Exibe dados climáticos do local, como temperatura atual, umidade e precipitação acumulada do dia. Inclui previsão para os próximos 7 dias, detalhando temperatura máxima e mínima, probabilidade de chuva, além de ilustrações e descrições do clima previsto para cada dia.
- **Horário e Data Local**: Mostra a diferença de fuso horário entre o usuário e o local selecionado. Inclui o horário local e a data, detalhando o dia da semana, dia do mês e o mês.
- **Detalhes Geográficos**: Fornece informações como latitude, longitude, região administrativa, país, estado e outras características relacionadas à localização.

## 🚀 Tecnologias Utilizadas

- **Next.js**: Framework React para renderização do lado do servidor e geração de sites estático.
- **Typescript**: Para segurança de tipagem e escalabilidade do código.
- **Tailwind CSS**: Framework CSS para uma estilização rápida, responsiva e moderna.
- **API de Geolocalização**: Utilizada para obter dados geográficos detalhados com base em informações de localização.
- **API de Data e Horário**: Fornece informações precisas sobre horários locais e diferenças de fuso horário com base em coordenadas geográficas.
- **API de Dados Meteorológicos**: Gera informações climáticas, incluindo previsões detalhadas para os próximos dias.
- **API de Mapa**: Permite a integração de mapas interativos, oferecendo recursos como zoom, marcações e navegação direta.

## 🏅Menções

Este projeto se beneficia de APIs gratuitas e de código aberto que tornam possíveis suas funcionalidades avançadas. Agradecimentos especiais às seguintes ferramentas e serviços:

- [Open-Meteo](https://open-meteo.com/)  
  API utilizada para obter informações meteorológicas detalhadas com base em coordenadas geográficas, incluindo previsões climáticas.

- [TimeZoneDB](https://timezonedb.com/)  
  Serviço que fornece dados precisos sobre fusos horários e horários locais para diferentes regiões do mundo.

- [Nominatim](https://nominatim.org/release-docs/latest/)  
  Ferramenta de geocodificação que converte texto (como nomes de cidades ou endereços) em coordenadas geográficas.

- [Leaflet](https://leafletjs.com/) e [OpenStreetMap](https://www.openstreetmap.org/)  
  API poderosa de mapas interativos, utilizada para exibir localizações geográficas com funcionalidades avançadas, como zoom e marcações personalizadas.
