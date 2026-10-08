# Bezpieczne Dzieci – Generator rodzinnego planu bezpieczeństwa (wersja pomarańczowa)

**Wgraj zawartość paczki bezpośrednio do GŁÓWNEGO katalogu repozytorium GitHub Pages. Nie twórz nowego folderu.**

## Kolorystyka
Ciemny grafit / ciepły brąz z pomarańczowymi akcentami (#FB923C). Kolor zastosowano wyłącznie do generatora i jego zapowiedzi na stronie głównej; pozostałe moduły zachowują dotychczasowe kolory. Funkcje, scenariusze i SEO bez zmian.

## Pliki paczki
- `index.html` – dotychczasowa strona główna z dodaną zapowiedzią generatora i odnośnikiem w Centrum Wiedzy. Zastępuje poprzedni `index.html`.
- `generator-rodzinnego-planu-bezpieczenstwa.html` – nowa kompletna podstrona: formularz, plan na żywo, druk/PDF, plik TXT i quiz 6 sytuacji.
- `favicon-plan-rodzinny.svg` – dedykowana ikona generatora.
- `og-plan-rodzinny.png` – autorska grafika na potrzeby udostępniania (1200 × 630 px).
- `.nojekyll` – pusta konfiguracja kompatybilna z GitHub Pages (jeśli istnieje, pozostaw ją bez zmian).

## Instalacja
1. Rozpakuj ZIP.
2. Otwórz istniejące repozytorium serwisu `bezpiecznedzieci.com`.
3. Kliknij `Add file → Upload files`, wgraj wymienione pliki do katalogu głównego.
4. Zatwierdź zmianę `index.html`. Nie usuwaj innych dotychczasowych plików repozytorium.
5. Po opublikowaniu sprawdź: https://bezpiecznedzieci.com/generator-rodzinnego-planu-bezpieczenstwa.html
6. Sprawdź link ze strony głównej do generatora, wydruk/PDF, plik TXT i quiz na telefonie.
7. W Google Search Console: Inspekcja adresu → Poproś o zindeksowanie.

## SEO
- Tytuł HTML oraz H1 są niezależne od nazwy oficjalnej akcji MSWiA.
- Tekst i meta description rzeczowo odnoszą się do Krajowego Treningu Rodzinnego 17 października 2026 r.
- `canonical`, `og:url`, `og:image`, JSON-LD wskazują na prawdziwy adres pliku HTML. Nie ma `Event`, bo strona nie organizuje ani nie rejestruje udziału w wydarzeniu.
- Strona główna promuje nowy moduł i ma aktualizację `ItemList` (pozycja 7).
- Grafika OG jest oryginalna; bez logo lub graficznych materiałów MSWiA.

## Prywatność i odpowiedzialność
Wpisane dane nie są wysyłane z formularza. Operacje odbywają się po stronie przeglądarki. Nie jest stosowany `localStorage` ani jakakolwiek usługa analityczna wewnątrz podstrony. Eksport TXT zapisuje dane wyłącznie w pliku pobranym przez użytkownika. Wydruk może zawierać numer telefonu — użytkownik odpowiada za jego przechowywanie i udostępnianie. Generator jest **niezależnym narzędziem edukacyjnym**, nie oficjalnym projektem MSWiA, nie zatwierdza stopnia przygotowania rodziny i nie zastępuje zaleceń służb.

## Zależności
Plik HTML ma CSS i JavaScript osadzone w środku. Brak bibliotek i zewnętrznych fontów. GitHub Pages wystarczy — nie trzeba serwera ani bazy danych.

Utworzono: 8 października 2026 r.

**Aktualizacja wizualna:** pomarańczowy motyw, bez zmiany sposobu działania aplikacji.
