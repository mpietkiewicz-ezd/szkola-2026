# Bezpieczne Dzieci — pliki do głównego katalogu GitHub Pages

**Wszystkie pliki z tej paczki wgrywasz obok siebie, bez tworzenia nowego folderu.**

```
repozytorium/
├── index.html                         ← istniejąca strona główna: atak z powietrza (z dodanym linkiem)
├── atak-nozownika-w-szkole.html       ← nowy trening, ciemnoczerwony
├── og-atak-nozownika.png              ← nowy obrazek udostępniania, nie nadpisuje og-image.png
├── favicon-atak-nozownika.svg         ← nowa ikona, nie nadpisuje favicon.png
├── .nojekyll                           ← opcjonalna zgodność z GitHub Pages
└── README-WGRANIE.md                   ← ten plik
```

## Publikacja w istniejącym repozytorium

1. Zrób kopię dotychczasowego `index.html` na dysku i upewnij się, że plik wysłany do tej rozmowy jest aktualną wersją produkcyjną.
2. W repozytorium GitHub kliknij **Add file → Upload files**, wybierz pliki z paczki i zatwierdź **Commit changes**.
3. GitHub zapyta o zastąpienie `index.html` (to zamierzone). W pozostałych istniejących plikach nic nie zmieniaj.
4. Sprawdź `https://bezpiecznedzieci.com/` oraz `https://bezpiecznedzieci.com/atak-nozownika-w-szkole.html`.
5. Jeżeli w repozytorium jest `sitemap.xml`, dodaj do niego nowy adres. Zaktualizuj datę modyfikacji, jeśli faktycznie zmieniłeś stronę.
6. Prześlij nowy adres do zaindeksowania w Google Search Console; sprawdź też poprawność podglądu OG.

## Uwaga: istniejące zasoby projektu

Obecny `index.html` nadal korzysta z `hero-school.jpg`, `favicon.png`, `og-image.png`, pięciu stron poradników i `gra-edukacyjna-bezpieczenstwo-dzieci.html`. **Nie są częścią tej paczki**, ponieważ nie zostały przekazane do rozmowy w kompletnej postaci. Muszą pozostać w dotychczasowym repozytorium. Ta paczka zawiera wszystkie nowe/zmienione pliki potrzebne do dołożenia szóstego modułu, ale nie jest kompletną kopią historycznego repozytorium.

## Prawa autorskie i prywatność

- Nowa strona nie kopiuje oficjalnych logotypów ani slajdów, odsyła do źródeł.
- W metadanych i treści rozróżnia 4U CPT ABW od autorskich ćwiczeń szkolnych.
- Licencje nowej strony dopasowano do istniejących informacji licencyjnych na stronie głównej: treść CC BY-SA 4.0, kod MIT. Zewnętrzne utwory i znaki zachowują własne zasady ochrony.
- Ćwiczenia mają charakter edukacyjny i nie są urzędową procedurą ani instruktażem walki dla dzieci.
- Nowy moduł nie wymaga logowania i nie zapisuje wyników na serwerze. Hosting i narzędzia analityczne całego serwisu mogą jednak przetwarzać dane techniczne.

## Kontrola po publikacji

- Wejdź na stronę główną: widoczna nowa zapowiedź w bordo oraz szósty kafel w poradnikach.
- Otwórz nowy trening: trzy role, pięć pytań na rolę, karta do wydruku.
- Sprawdź telefony oraz to, czy nie nadpisano poprzednich plików `favicon.png` i `og-image.png`.
