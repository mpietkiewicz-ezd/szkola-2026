BEZPIECZNE DZIECI — edycja 5.0
Aktualizacja merytoryczna: 01.10.2026
Autor: Marcin Pietkiewicz — https://marcin-pietkiewicz.pl/

WDROŻENIE
Wgraj do katalogu głównego bezpiecznedzieci.com cały zestaw:
- index.html
- favicon.png
- og-image.png
- robots.txt
- sitemap.xml
- folder assets/
  - alarm-ogloszenie.mp3
  - alarm-odwolanie.mp3

Nie wgrywaj samego index.html bez folderu assets — odtwarzacz pełnych sygnałów alarmowych nie będzie miał plików audio.

NAJWAŻNIEJSZE ZMIANY 5.0
1. Rozdzielono formalne formy ochrony (schron, ukrycie, MDS, punkt schronienia) od organizacyjnego „miejsca schronienia” w procedurze placówki.
2. Usunięto logikę pozwalającą po alarmie prowadzić dzieci do punktu/miejsca w innym budynku tylko dlatego, że trasa i czas są korzystne.
3. Dodano wyjątek: opuszczenie budynku przy bezpośrednim zagrożeniu dla życia/zdrowia i poleceniu właściwego organu lub służb wraz ze wskazaniem bezpiecznej drogi.
4. Dodano audyt gotowości 60 s: dostęp i klucze, dwa wyjścia, oświetlenie, łączność, wyposażenie, listy obecności, części wspólne, rodzice, role/zastępstwa, ćwiczenia i szczególne potrzeby.
5. Rozbudowano zasady dotyczące rodziców, meldunków, list obecności, pozostawiania rzeczy osobistych i ćwiczeń z dziećmi.
6. Dodano statyczną sekcję wiedzy i FAQ indeksowalne przez wyszukiwarki.
7. Rozbudowano SEO: title, description, canonical, Open Graph/Twitter, JSON-LD, sitemap.xml, robots.txt, obraz 1200×630.
8. Autor w stopce prowadzi do https://marcin-pietkiewicz.pl/.
9. Dwa MP3 wyjęto z base64 w HTML do osobnych plików. HTML zmniejszył się z ok. 4,07 MB do ok. 245 kB.
10. Przykładowy Alert RCB i jego odwołanie zaktualizowano do komunikatów z 28.09.2026.

TESTY WYKONANE PRZED ZAPAKOWANIEM
- poprawność składni wszystkich skryptów JavaScript: OK,
- poprawność JSON-LD: OK,
- brak zduplikowanych identyfikatorów HTML: OK,
- test logiki: brak formalnej formy ochrony, formalny punkt/schron/ukrycie/MDS, miejsce poza placówką i wyjątek z poleceniem służb: OK,
- trzy pełne automatyczne przejścia scenariusza (w tym wariant z miejscem poza placówką): OK,
- brak starej odpowiedzi „korzystam z punktu przy bezpiecznej trasie” i brak zewnętrznego miejsca jako strefy przydziału: OK.

UWAGA
Symulator pozostaje narzędziem edukacyjnym. Nie kwalifikuje obiektów, nie nadaje im statusu prawnego i nie zastępuje procedur placówki, rozpoznania budynku, ekspertyzy ani poleceń właściwych organów i służb.
