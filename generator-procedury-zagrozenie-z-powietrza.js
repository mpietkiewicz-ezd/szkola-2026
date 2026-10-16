/* Bezpieczne Dzieci — Generator procedury szkoły (bez bibliotek, bez połączeń sieciowych).
   © Marcin Pietkiewicz. Kod: MIT. Wszystkie dane są przetwarzane w pamięci przeglądarki. */
'use strict';
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const clean=s=>String(s??'').trim();
const num=v=>Number.isFinite(+v)&&+v>=0?Math.floor(+v):0;
const fmt=n=>Number(n).toLocaleString('pl-PL');
const noBlank=s=>clean(s)||'[DO UZUPEŁNIENIA]';
const STEP_NAMES=['Placówka','Miejsca schronienia','Grupy i trasy','Organizacja alarmu','Gotowość i ćwiczenia','Word i kontrola'];
const STEP_SECTIONS=[[0,1],[2],[3],[4,5],[6,7],[8]];
const sectionPage=n=>STEP_SECTIONS.findIndex(group=>group.includes(n));
const FORMAL=[['organ','Pisemne ustalenia z organem prowadzącym'],['manager','Uzgodnienie z właścicielem / zarządcą budynku'],['civil','Uzgodnienie z właściwym organem ochrony ludności'],['technical','Oględziny i wymagana weryfikacja techniczna']];
const ROLE_DATA=[
['director','Dyrektor / osoba kierująca','Uruchamia działania, utrzymuje kontakt ze służbami i organem prowadzącym; po alarmie potwierdza sposób zakończenia.'],
['movement','Koordynator przemieszczania','Kontroluje ruch i zatory, zbiera zbiorcze dane o liczbie osób.'],
['shelter','Koordynator miejsc schronienia','Przyjmuje grupy, sprawdza obłożenie, prowadzi wykaz meldunków.'],
['information','Odbiór ostrzeżeń i alarmowanie','Monitoruje kanały urzędowe, rejestruje komunikaty i uruchamia wewnętrzny sygnał.'],
['secretariat','Sekretariat / dziennik zdarzeń','Zapisuje godziny komunikatów, decyzji i meldunków.'],
['firstaid','Koordynator pierwszej pomocy','Organizuje pomoc, przekazuje informacje ratownikom.'],
['psychology','Pedagog / psycholog','Wspiera dzieci i personel, dostosowuje komunikację do wieku.'],
['accessibility','Wsparcie osób ze szczególnymi potrzebami','Wdraża wcześniej uzgodnione rozwiązania bez danych medycznych w publicznym dokumencie.'],
['technical','Koordynator techniczny','Sprawdza dostępne części, instalacje i drożność; nie podejmuje ryzyka.'],
['entrance','Wejścia, części wspólne i ruch','Zabezpiecza wejścia, nadzoruje korytarze i pomaga w przyjęciu służb.'],
['parents','Komunikacja z rodzicami','Przekazuje jedynie komunikaty zatwierdzone przez osobę kierującą.'],
['transport','Wycieczki, dowóz i zajęcia poza szkołą','Zapewnia kontakt z opiekunami, przewoźnikiem i prowadzącymi zajęcia.']
];
const GEAR=[
['keys','Dostęp do miejsc, klucze i możliwość otwarcia','Sprawdzone w godzinach pracy, również przy nieobecności osoby podstawowej'],
['routes','Drożność przejść i drzwi','Bez zastawiania i naruszania wymagań ochrony przeciwpożarowej'],
['lights','Oświetlenie awaryjne, latarki, zapas baterii','Bez uzależnienia od dostaw energii elektrycznej'],
['radio','Odbiornik na baterie / oficjalne komunikaty','Dostęp także przy braku internetu'],
['comms','Łączność zastępcza i meldunki','Radiotelefony, gońcy lub inne przetestowane rozwiązanie'],
['lists','Aktualne listy obecności także offline','Minimalizacja danych, dostęp wyłącznie dla upoważnionych'],
['firstaid','Apteczki i przeszkolone osoby','Dostępność bez powrotu do sal podczas alarmu'],
['water','Woda do pobytu w pomieszczeniach','Ilość dostosowana do realnych warunków i zaleceń'],
['hygiene','Środki higieny, odpady i rozwiązania sanitarne','Warunki na wypadek przedłużenia pobytu'],
['covers','Koce, miejsca siedzenia i warunki cieplne','Odpowiednio do wieku i czasu pobytu'],
['meds','Dostęp do indywidualnie potrzebnych produktów leczniczych','Zgodnie z zasadami placówki, bez zamieszczania nazwisk i dawek w generatorze'],
['support','Rozwiązania dla osób wymagających wsparcia','Dostępne drogi, pomoc personelu, potrzebne pomoce'],
['nursery','Wyposażenie dla małych dzieci','Odpowiednia żywność, pieluchy, odzież na zmianę – jeśli dotyczy'],
['signal','Sprawdzony wewnętrzny sygnał inny niż pożarowy','Słyszalny w użytkowanych częściach budynku, uzupełniony w razie potrzeby'],
['parents','Rodzice zapoznani z zasadami kontaktu','Znają zasady pozostawania dzieci w szkole podczas alarmu']
];
const KIND=[['room','Pomieszczenie wewnętrzne (wyznaczenie organizacyjne)'],['shelter','Schron (status potwierdzony przez właściwy podmiot)'],['hideout','Ukrycie (status potwierdzony przez właściwy podmiot)'],['mds','Miejsce doraźnego schronienia (MDS)'],['point','Punkt schronienia']];
const GEAR_STATUS=[['unknown','Nie sprawdzono'],['yes','Tak, sprawdzone'],['partial','Częściowo'],['no','Nie / brak']];
const STATE_VERSION=1;
let currentStep=0, uid=0, demo=false;
let state={places:[],groups:[],roles:{},gear:{}};
const id=()=>`item${++uid}`;
const placeDefault=()=>({id:id(),name:'',kind:'room',building:'',floor:'',capacity:'',confirmed:false,basis:'',exits:'unknown',glass:'unknown',access:'unknown',accessible:'unknown',outside:false,notes:''});
const groupDefault=()=>({id:id(),name:'',children:'',escorts:'',origin:'',placeId:'',route:'',backup:'',outside:false,minutes:'',leader:'',deputy:'',support:''});
function renderSteps(){ $('#step-list').innerHTML=STEP_NAMES.map((s,i)=>`<button class="step-nav ${i===currentStep?'active':''}" type="button" data-goto="${i}" ${i===currentStep?'aria-current="step"':''}><span class="n">${i+1}</span><span>${esc(s)}</span></button>`).join(''); }
function go(i,scroll=true){
 currentStep=Math.max(0,Math.min(STEP_NAMES.length-1,i));
 $$('.step').forEach(s=>s.classList.toggle('active',STEP_SECTIONS[currentStep].includes(+s.dataset.step)));
 renderSteps();
 $('#prev-step').disabled=currentStep===0;
 $('#next-step').hidden=currentStep===STEP_NAMES.length-1;
 $('#next-step').textContent=currentStep===STEP_NAMES.length-2?'Sprawdź i pobierz Word →':'Dalej →';
 $('#step-counter').textContent=`Część ${currentStep+1} z ${STEP_NAMES.length}`;
 if(currentStep===STEP_NAMES.length-1)renderAudit();
 if(scroll)document.querySelector('.tool').scrollIntoView({behavior:'smooth',block:'start'});
 const h=$(`.step[data-step="${STEP_SECTIONS[currentStep][0]}"] h2`);
 if(h&&scroll){h.setAttribute('tabindex','-1');h.focus({preventScroll:true});}
}

const opts=(items,val)=>items.map(([v,label])=>`<option value="${esc(v)}" ${String(val)===String(v)?'selected':''}>${esc(label)}</option>`).join('');
const field=(label,key,val,type='text',more='')=>`<label>${esc(label)}<input type="${type}" data-key="${esc(key)}" value="${esc(val)}" ${more}></label>`;
const choice=(label,key,val,arr)=>`<label>${esc(label)}<select data-key="${esc(key)}">${opts(arr,val)}</select></label>`;
const textfield=(label,key,val)=>`<label class="full">${esc(label)}<textarea data-key="${esc(key)}" rows="2">${esc(val)}</textarea></label>`;
function foldRepeatedDetails(root,keys,title){
 for(const rep of root.querySelectorAll('.repeater')){
  const fields=rep.querySelector('.rep-body > .mini-fields');
  if(!fields)continue;
  const labels=[...fields.children].filter(el=>el.tagName==='LABEL'&&keys.some(key=>el.querySelector(`[data-key="${key}"]`)));
  if(!labels.length)continue;
  const details=document.createElement('details');details.className='advanced-details full';
  const summary=document.createElement('summary');summary.textContent=title;details.append(summary);
  const inner=document.createElement('div');inner.className='mini-fields';
  for(const label of labels){const control=label.querySelector('[data-key]');if(control){const v=control.type==='checkbox'?control.checked:control.value;if(v&&v!=='unknown'&&v!=='')details.open=true;}inner.appendChild(label)}
  details.appendChild(inner);fields.appendChild(details);
 }
}
function renderPlaces(){
 $('#places').innerHTML=state.places.map((p,i)=>`<article class="repeater" data-place-id="${esc(p.id)}"><div class="rep-head"><strong>Miejsce ${i+1}: ${esc(p.name||'bez nazwy')}</strong><button type="button" data-delete-place="${esc(p.id)}">Usuń miejsce</button></div><div class="rep-body"><div class="mini-fields">
 ${field('Nazwa / oznaczenie miejsca', 'name',p.name,'text','maxlength="140" placeholder="np. P-01 / wewnętrzny korytarz"')}
 ${choice('Rodzaj miejsca / status','kind',p.kind,KIND)}
 ${field('Budynek / skrzydło','building',p.building)}
 ${field('Kondygnacja, numer pomieszczenia','floor',p.floor)}
 ${field('Pojemność – osoby (nie liczymy automatycznie z m²)','capacity',p.capacity,'number','min="0" max="100000" inputmode="numeric"')}
 ${choice('Wyjścia z wybranej kondygnacji','exits',p.exits,[['unknown','Nie sprawdzono'],['two','Co najmniej dwa wyjścia'],['one','Mniej niż dwa / wątpliwość']])}
 <label class="full"><input data-key="confirmed" type="checkbox" ${p.confirmed?'checked':''}><span><strong>Pojemność została faktycznie potwierdzona</strong> na podstawie ustaleń z właściwymi podmiotami, nie tylko własnego szacunku.</span></label>
 ${field('Podstawa potwierdzenia / nr dokumentu','basis',p.basis,'text','maxlength="220" placeholder="np. protokół, pismo, ekspertyza, data"')}
 ${choice('Przeszklenia i osłona','glass',p.glass,[['unknown','Nie sprawdzono'],['good','Wewnętrzne, bez lub z ograniczonym oszkleniem'],['risk','Znaczne przeszklenia / duża ekspozycja']])}
 ${choice('Dostęp i klucze','access',p.access,[['unknown','Nie sprawdzono'],['yes','Sprawdzone, dostępne'],['no','Brak stałego dostępu / problem']])}
 ${choice('Dostępność dla osób o ograniczonej mobilności','accessible',p.accessible,[['unknown','Nie sprawdzono'],['yes','Zapewniona'],['partial','Wymaga wsparcia / wariantu'],['no','Niedostępne']])}
 <label><input data-key="outside" type="checkbox" ${p.outside?'checked':''}><span>Miejsce znajduje się <strong>poza budynkiem</strong> placówki</span></label>
 ${textfield('Uwagi o wentylacji, drożności, przeszkodach i ograniczeniach','notes',p.notes)}
 </div></div></article>`).join('')||'<p class="notice">Brak miejsc. Dodaj pierwsze pomieszczenie i podaj faktycznie ustaloną pojemność.</p>';
 foldRepeatedDetails($('#places'),['building','exits','glass','accessible','notes'],'Dodatkowe cechy miejsca i uwagi');
 updateCapacity();
}
function renderGroups(){const available=[['','— wybierz miejsce —'],...state.places.map(p=>[p.id,p.name||`Miejsce ${state.places.indexOf(p)+1}`])];
 $('#groups').innerHTML=state.groups.map((g,i)=>`<article class="repeater" data-group-id="${esc(g.id)}"><div class="rep-head"><strong>Grupa ${i+1}: ${esc(g.name||'bez nazwy')}</strong><button type="button" data-delete-group="${esc(g.id)}">Usuń grupę</button></div><div class="rep-body"><div class="mini-fields">
 ${field('Grupa / klasa / świetlica / stołówka','name',g.name,'text','maxlength="130" placeholder="np. 5B lub świetlica, lokalizacja"')}
 ${field('Liczba uczniów / dzieci','children',g.children,'number','min="0" max="100000" inputmode="numeric"')}
 ${field('Liczba opiekunów przy grupie','escorts',g.escorts,'number','min="0" max="10000" inputmode="numeric"')}
 ${field('Lokalizacja wyjściowa','origin',g.origin,'text','placeholder="np. sala 24, piętro 1"')}
 ${choice('Docelowe miejsce schronienia','placeId',g.placeId,available)}
 ${field('Droga podstawowa (wewnątrz budynku)','route',g.route,'text','maxlength="500" placeholder="np. korytarz A → klatka B → piwnica"')}
 ${field('Droga zastępcza (jeśli jest)','backup',g.backup,'text','maxlength="500" placeholder="np. klatka C; inaczej pozostanie w osłonie"')}
 ${field('Zmierzony czas przejścia (minuty)','minutes',g.minutes,'number','min="0" max="240" step="0.1" inputmode="decimal"')}
 <label class="full"><input type="checkbox" data-key="outside" ${g.outside?'checked':''}><span>Przewidziana trasa wymaga <strong>wyjścia na otwartą przestrzeń</strong> w trakcie alarmu</span></label>
 ${field('Osoba / funkcja prowadząca','leader',g.leader)}
 ${field('Zastępstwo i wsparcie na końcu grupy','deputy',g.deputy)}
 ${textfield('Sposób pomocy osobom wymagającym wsparcia i alternatywa','support',g.support)}
 </div></div></article>`).join('')||'<p class="notice">Brak grup. Dodaj klasy, oddziały i lokalizacje, w których jednocześnie przebywają dzieci.</p>';
 foldRepeatedDetails($('#groups'),['backup','minutes','support'],'Droga zastępcza, czas przejścia i wsparcie');
}
function renderRoles(){ const rows=ROLE_DATA.map(([k,label,desc])=>{const r=state.roles[k]||{person:'',deputy:''};return `<div class="role"><div><strong>${esc(label)}</strong><small>${esc(desc)}</small></div><label>Osoba / stanowisko<input data-role="${esc(k)}" data-key="person" value="${esc(r.person)}" placeholder="osoba lub stanowisko"></label><label>Zastępca<input data-role="${esc(k)}" data-key="deputy" value="${esc(r.deputy)}" placeholder="kto zastępuje?"></label></div>`;});$('#roles').innerHTML=rows.slice(0,4).join('')+`<details class="optional-roles"><summary>Pozostałe role i zastępstwa (${rows.length-4})</summary><div class="optional-roles-inner">${rows.slice(4).join('')}</div></details>`;}
function renderEquipment(){ $('#equipment').innerHTML=GEAR.map(([k,title,desc])=>`<div class="equipment-item"><div><strong>${esc(title)}</strong><small>${esc(desc)}</small></div><label><span class="sr-only">Stan: ${esc(title)}</span><select data-gear="${esc(k)}">${opts(GEAR_STATUS,state.gear[k]||'unknown')}</select></label></div>`).join(''); }
function updateCapacity(){const get=n=>num($(`[name="${n}"]`)?.value);const all=get('pupils')+get('staff')+get('visitors');const confirmed=state.places.reduce((s,p)=>s+(p.confirmed&&!p.outside?num(p.capacity):0),0);if($('#total-people')){ $('#total-people').textContent=fmt(all);$('#total-capacity').textContent=fmt(confirmed);$('#capacity-gap').textContent=all?fmt(confirmed-all):'–';}}
function data(){const fields={};$$('#generator-form [name]').forEach(el=>{fields[el.name]=el.type==='checkbox'?el.checked:el.value});return {version:STATE_VERSION,fields,places:state.places,groups:state.groups,roles:state.roles,gear:state.gear,example:demo};}
function setFields(fields){$$('#generator-form [name]').forEach(el=>{if(Object.hasOwn(fields,el.name)){if(el.type==='checkbox')el.checked=!!fields[el.name];else el.value=fields[el.name]??'';}});}
function toast(msg){const el=$('#toast');el.textContent=msg;el.hidden=false;clearTimeout(toast._t);toast._t=setTimeout(()=>el.hidden=true,3600);}
function download(blob,name){const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1800);}
function saveProject(){download(new Blob([JSON.stringify(data(),null,2)],{type:'application/json;charset=utf-8'}),'bezpieczne-dzieci-procedura-projekt.json');toast('Zapisano projekt JSON na urządzeniu. Przechowuj go poza publicznym dostępem.');}
function loadProject(o){if(!o||typeof o!=='object'||o.version!==STATE_VERSION||!o.fields||!Array.isArray(o.places)||!Array.isArray(o.groups)||o.places.length>300||o.groups.length>1000)throw Error('Nieobsługiwana wersja lub uszkodzony plik.');state.places=o.places.map(p=>({...placeDefault(),...p,id:id()}));const idsOldToNew=new Map(o.places.map((p,i)=>[p.id,state.places[i].id]));state.groups=o.groups.map(g=>({...groupDefault(),...g,id:id(),placeId:idsOldToNew.get(g.placeId)||''}));state.roles=Object.fromEntries(ROLE_DATA.map(([k])=>[k,{person:clean(o.roles?.[k]?.person).slice(0,250),deputy:clean(o.roles?.[k]?.deputy).slice(0,250)}]));state.gear=Object.fromEntries(GEAR.map(([k])=>[k,GEAR_STATUS.some(([v])=>v===o.gear?.[k])?o.gear[k]:'unknown']));setFields(o.fields);demo=!!o.example;$('#demo-alert').hidden=!demo;renderPlaces();renderGroups();renderRoles();renderEquipment();refresh();go(0);}
function resetAll(){state={places:[],groups:[],roles:{},gear:{}};demo=false;$('#demo-alert').hidden=true;$('#generator-form').reset();renderPlaces();renderGroups();renderRoles();renderEquipment();refresh();go(0);}
const addFinding=(out,level,step,title,detail)=>out.push({level,step,title,detail});
function audit(d=data()){
 const f=d.fields,p=d.places,g=d.groups,issues=[];const fail=(lvl,s,title,desc)=>addFinding(issues,lvl,s,title,desc);const people=num(f.pupils)+num(f.staff)+num(f.visitors);
 if(!clean(f.schoolName)||!clean(f.schoolAddress))fail('important',0,'Niepełne dane identyfikacyjne','Podaj nazwę i adres placówki.');
 if(!clean(f.authority)||!clean(f.manager))fail('important',0,'Nie wskazano organu prowadzącego lub zarządcy','Wskaż właściwe podmioty odpowiedzialne za uzgodnienia.');
 if(!f.formal_organ||!f.formal_manager||!f.formal_civil)fail('critical',0,'Brak kompletu pisemnych uzgodnień','Przed wdrożeniem wymagane są odpowiednie pisemne ustalenia z organem prowadzącym, zarządcą i organem ochrony ludności.');
 if(!f.formal_technical)fail('critical',0,'Brak potwierdzenia oględzin / weryfikacji technicznej','Wybór pomieszczeń trzeba oprzeć na dokumentacji i oględzinach osób właściwych do oceny budynku.');
 if(!people)fail('critical',1,'Nie wskazano maksymalnej liczby osób','Bez maksymalnego obłożenia nie można porównywać potrzeb z pojemnością miejsc.');
 if(!num(f.staff))fail('important',1,'Nie oszacowano liczby pracowników','Nie pomijaj nauczycieli i obsługi w bilansie.');
 if(f.specialNeeds==='nie ustalono')fail('important',1,'Nie rozpoznano potrzeb wsparcia','Zidentyfikuj sposób zapewnienia pomocy, bez wprowadzania do generatora danych wrażliwych dzieci.');
 if(f.specialNeeds==='tak'&&!clean(f.supportPlan))fail('critical',1,'Brak planu wsparcia osób o szczególnych potrzebach','Opisz osoby pomagające, sprzęt, trasę dostępną i wariant awaryjny.');
 if(!p.length)fail('critical',2,'Nie wskazano żadnego miejsca schronienia','Dodaj wcześniej rozpoznane i uzgodnione miejsca wewnątrz budynku.');
 const capacity=p.reduce((sum,z)=>sum+(z.confirmed&&!z.outside?num(z.capacity):0),0);
 if(p.length&&!capacity)fail('critical',2,'Brak potwierdzonej pojemności miejsc','Wpisanie liczby w formularz bez zaznaczenia faktycznej weryfikacji nie potwierdza pojemności.');
 if(people&&capacity<people)fail('critical',2,'Potwierdzona pojemność niższa od liczby osób',`Potrzeba ${fmt(people)} miejsc, potwierdzono ${fmt(capacity)} (niedobór ${fmt(people-capacity)}). Należy zawiadomić organ prowadzący i właściwy organ ochrony ludności.`);
 for(const z of p){const n=z.name||'(bez nazwy)';if(!clean(z.name))fail('important',2,'Miejsce bez oznaczenia','Każde miejsce powinno mieć jednoznaczną nazwę na rzutach i w przydziałach.');
 if(z.outside)fail('critical',2,`Miejsce ${n} poza budynkiem`,'Nie wyznaczaj przejścia przez otwartą przestrzeń po ogłoszeniu alarmu. Miejsce zewnętrzne może mieć odrębne zastosowanie przed alarmem lub zgodnie z poleceniem służb.');
 if(z.kind!=='room'&&!clean(z.basis))fail('critical',2,`Nieudokumentowany status: ${n}`,'Schron, ukrycie, MDS i punkt schronienia nie mogą być samodzielnie klasyfikowane przez dyrektora. Podaj podstawę statusu.');
 if(!z.confirmed||!num(z.capacity))fail('important',2,`Brak potwierdzonej pojemności: ${n}`,'Dokument nie będzie tego miejsca traktował jako potwierdzonej pojemności.');
 if(z.confirmed&&!clean(z.basis))fail('important',2,`Brak podstawy pojemności: ${n}`,'Wpisz pismo, protokół, dokumentację lub inne ustalenie potwierdzające pojemność.');
 if(z.exits!=='two')fail(z.exits==='one'?'critical':'important',2,`Wyjścia wymagają weryfikacji: ${n}`,'Sprawdź co najmniej dwa wyjścia z wybranej kondygnacji i bezpieczny sposób opuszczenia pomieszczeń.');
 if(z.glass==='risk')fail('critical',2,`Duże przeszklenia: ${n}`,'Zweryfikuj przydatność pomieszczenia: duże przeszklenia zwiększają ryzyko.');
 if(z.access!=='yes')fail(z.access==='no'?'critical':'important',2,`Niepewny dostęp: ${n}`,'Sprawdź klucze, drożność wejścia i obsadę również poza typowymi lekcjami.');
 if(z.accessible==='no'&&f.specialNeeds==='tak')fail('critical',2,`Brak dostępności: ${n}`,'Ustal bezpieczną, wykonalną alternatywę dla osób o ograniczonej mobilności.');}
 if(!g.length)fail('critical',3,'Brak przydziału grup','Zidentyfikuj każdą klasę, oddział i osoby w strefach wspólnych.');
 const assignedChildren=g.reduce((s,x)=>s+num(x.children),0),assignedTotal=g.reduce((s,x)=>s+num(x.children)+num(x.escorts),0);
 if(num(f.pupils)&&assignedChildren<num(f.pupils))fail('important',3,'Nie wszyscy uczniowie mają przydział',`Przydzielono ${fmt(assignedChildren)} z maksymalnie ${fmt(num(f.pupils))} dzieci. Zadbaj również o świetlicę, WF, bibliotekę i zajęcia poza salą.`);
 if(num(f.pupils)&&assignedChildren>num(f.pupils))fail('important',3,'Suma dzieci w grupach większa od bilansu',`Suma grup: ${fmt(assignedChildren)}, maksymalna deklarowana liczba dzieci: ${fmt(num(f.pupils))}. Sprawdź, czy te same osoby nie są policzone dwa razy.`);
 const over=new Map();for(const x of g){const n=x.name||'(bez nazwy)';if(!clean(x.name)||!num(x.children))fail('important',3,`Niepełne dane grupy ${n}`,'Podaj nazwę i liczbę osób.');
 if(!x.placeId||!p.some(z=>z.id===x.placeId))fail('critical',3,`Brak miejsca docelowego: ${n}`,'Wskaż rzeczywiście dostępne miejsce w budynku.');
 else over.set(x.placeId,(over.get(x.placeId)||0)+num(x.children)+num(x.escorts));
 if(x.outside)fail('critical',3,`Trasa przez otwartą przestrzeń: ${n}`,'Takiej trasy nie należy przewidywać na czas alarmu związanego z atakiem z powietrza.');
 if(!clean(x.route))fail('important',3,`Brak trasy podstawowej: ${n}`,'Opisz przejście wewnątrz budynku; zweryfikuj na rzucie.');
 if(!clean(x.backup))fail('important',3,`Brak wariantu zastępczego: ${n}`,'Jeżeli brak drugiej bezpiecznej trasy, opisz wariant pozostania w osłoniętym miejscu i sposób meldowania.');
 if(!clean(x.leader)||!clean(x.deputy))fail('important',3,`Niepełna obsada grupy: ${n}`,'Wskaż prowadzącego i zastępstwo lub funkcję wspierającą.');
 if(!clean(x.minutes))fail('important',7,`Brak zmierzonego czasu: ${n}`,'Uzupełnij po praktycznym sprawdzeniu; nie przyjmuj progów czasowych bez podstawy.');}
 for(const z of p){const occ=over.get(z.id)||0;if(z.confirmed&&occ>num(z.capacity))fail('critical',3,`Przekroczona pojemność: ${z.name||'miejsce'}`,`Przydział dzieci i opiekunów: ${fmt(occ)}; potwierdzona pojemność: ${fmt(num(z.capacity))}. Nie planuj przekroczenia.`);}
 if(people&&assignedTotal<people)fail('important',3,'Bilans miejsc nie uwzględnia wszystkich obecnych',`Przydziały grup obejmują ${fmt(assignedTotal)} osób, a maksymalne obłożenie wynosi ${fmt(people)}. Zaplanuj również pozostałą obsługę i gości, unikając podwójnego liczenia.`);
 if(!clean(f.unassignedPlan))fail('important',3,'Brak zasad dla osób poza grupami','Opisz objęcie opieką dzieci z toalet i korytarzy oraz przydział dla pracowników i gości.');
 for(const [k,label] of ROLE_DATA){const r=d.roles[k]||{};if(!clean(r.person)||!clean(r.deputy))fail(['director','movement','shelter','information','firstaid'].includes(k)?'critical':'important',4,`Niepełna obsada: ${label}`,'Wskaż osobę lub funkcję oraz zastępstwo dla odpowiednich zmian.');}
 if(!clean(f.signal)||!clean(f.signalDistinct)||!clean(f.signalBackup))fail('critical',4,'Niepełny system alarmowania wewnętrznego','Ustal jednoznaczny sygnał odmienny od pożarowego i sposób alarmowania bez energii.');
 if(!clean(f.reportRecipient)||!clean(f.reportBackup))fail('important',4,'Brak kompletnej ścieżki meldunków','Wskaż adresata meldunków i sposób przekazania bez internetu.');
 for(const [k,t] of [['scenarioBreak','przerwa / korytarz'],['scenarioOutside','boisko / plac zabaw'],['scenarioTrip','wycieczka / wyjście'],['scenarioTransport','dowóz i odbiory'],['scenarioBlocked','uszkodzenie / zablokowana droga'],['scenarioOutage','blackout / brak łączności']])if(!clean(f[k]))fail('important',5,`Brak scenariusza: ${t}`,'Opisz realne działania osób obecnych w placówce.');
 if(!clean(f.parentChannel)||!clean(f.parentBackup)||!clean(f.pickupPoint))fail('important',5,'Niekompletna komunikacja z rodzicami','Ustal kanał podstawowy i zastępczy oraz bezpieczny odbiór po alarmie.');
 for(const [k,t] of GEAR){if(k==='nursery'&&f.schoolType==='szkoła')continue;const s=d.gear[k]||'unknown';if(s!=='yes')fail(['keys','routes','lights','comms','lists','firstaid','signal','support'].includes(k)?'important':'important',6,`Niepotwierdzone wyposażenie: ${t}`,s==='no'?'Zgłoszono brak – wpisz działanie naprawcze i odpowiedzialnego.':s==='partial'?'Dostępne częściowo – wskaż zakres i termin uzupełnienia.':'Sprawdź faktyczną dostępność i wpisz wynik.');}
 if(f.drillStage==='nie rozpoczęto')fail('important',7,'Brak szkolenia i ćwiczeń','Najpierw personel, następnie pojedyncze grupy, dopiero później cała placówka.');
 if(!clean(f.planRef)||!clean(f.plans))fail('critical',7,'Nie wskazano zweryfikowanych rzutów kondygnacji','Dołącz lokalnie do Worda rzeczywiste rysunki ze strefami, drogami, wyjściami i datą aktualizacji.');
 if(!clean(f.drillKeeper)||!clean(f.nextDrill))fail('important',7,'Nieustalony przegląd i następne ćwiczenie','Przypisz odpowiedzialnego i termin sprawdzenia.');
 return {issues,people,capacity,assignedChildren,assignedTotal,occupancy:over,critical:issues.filter(x=>x.level==='critical').length,important:issues.filter(x=>x.level==='important').length};
}
function completion(d=data()){let required=['schoolName','schoolAddress','authority','manager','director','pupils','staff','hours','formalNotes','supportPlan','signal','signalDistinct','signalBackup','reportRecipient','reportBackup','parentChannel','parentBackup','pickupPoint','planRef','plans','drillKeeper','nextDrill','scenarioBreak','scenarioOutside','scenarioTrip','scenarioTransport','scenarioBlocked','scenarioOutage'];let done=required.filter(k=>clean(d.fields[k])).length,max=required.length;
 max+=FORMAL.length;done+=FORMAL.filter(([k])=>d.fields['formal_'+k]).length;
 max+=6;done+=Math.min(6,d.places.filter(x=>clean(x.name)&&x.confirmed&&num(x.capacity)&&clean(x.basis)&&x.access==='yes').length*2);
 max+=6;done+=Math.min(6,d.groups.filter(x=>clean(x.name)&&num(x.children)&&x.placeId&&clean(x.route)&&clean(x.leader)).length*2);
 max+=ROLE_DATA.length*2;done+=ROLE_DATA.reduce((n,[k])=>n+Number(!!clean(d.roles[k]?.person))+Number(!!clean(d.roles[k]?.deputy)),0);
 max+=GEAR.length;done+=GEAR.filter(([k])=>(d.gear[k]||'unknown')!=='unknown').length;
 return Math.min(100,Math.round(done/max*100));}
function refresh(){const d=data();const pct=completion(d);$('#completion').textContent=pct+'% danych';$('#progress-bar').style.width=pct+'%';$('#progress-bar').parentNode.setAttribute('aria-label',`Kompletność danych ${pct} procent`);updateCapacity();if(currentStep===STEP_NAMES.length-1)renderAudit();}
function renderAudit(){const d=data(),a=audit(d),pct=completion(d);$('#audit-summary').innerHTML=`<strong>${a.critical?'Projekt wymaga poprawek':'Brak wykrytych krytycznych braków danych'}</strong><small>Kontrola dotyczy danych zadeklarowanych w formularzu, nie zatwierdzenia technicznego obiektu ani zgodności prawnej.</small><div class="audit-metrics"><span>Kompletność: ${pct}%</span><span>Krytyczne: ${a.critical}</span><span>Do poprawy: ${a.important}</span><span>Osoby: ${fmt(a.people)}</span><span>Pojemność potwierdzona: ${fmt(a.capacity)}</span></div>`;
 $('#audit-findings').innerHTML=a.issues.length?a.issues.map(f=>`<div class="finding ${f.level}"><strong>${f.level==='critical'?'KRYTYCZNE · ':'UZUPEŁNIJ · '}${esc(f.title)}</strong><p>${esc(f.detail)}</p><button type="button" data-goto="${sectionPage(f.step)}">Przejdź do części ${sectionPage(f.step)+1} →</button></div>`).join(''):'<div class="finding good"><strong>Uzupełniono wszystkie sprawdzane pola.</strong><p>Przed zatwierdzeniem dokumentu nadal konieczne są weryfikacje formalne i techniczne, aktualne rzuty oraz sprawdzenie rozwiązań podczas ćwiczeń.</p></div>';
}
function initialize(){
 $('#formal-checks').innerHTML=FORMAL.map(([k,v])=>`<label class="checkline"><input type="checkbox" name="formal_${k}"><span>${esc(v)}</span></label>`).join('');renderSteps();renderRoles();renderEquipment();renderPlaces();renderGroups();
 $('#step-list').addEventListener('click',e=>{const b=e.target.closest('[data-goto]');if(b)go(+b.dataset.goto)});
 $('#audit-findings').addEventListener('click',e=>{const b=e.target.closest('[data-goto]');if(b)go(+b.dataset.goto)});
 $('#next-step').onclick=()=>go(currentStep+1);$('#prev-step').onclick=()=>go(currentStep-1);
 $('#add-place').onclick=()=>{state.places.push(placeDefault());renderPlaces();renderGroups();refresh();};
 $('#add-group').onclick=()=>{state.groups.push(groupDefault());renderGroups();refresh();};
 $('#places').addEventListener('input',e=>updateRepeated(e,'place'));
 $('#groups').addEventListener('input',e=>updateRepeated(e,'group'));
 $('#places').addEventListener('change',e=>{updateRepeated(e,'place');if(e.target.dataset.key==='name')renderGroups();});
 $('#groups').addEventListener('change',e=>updateRepeated(e,'group'));
 function updateRepeated(e,kind){const root=e.target.closest(kind==='place'?'[data-place-id]':'[data-group-id]'),key=e.target.dataset.key;if(!root||!key)return;const arr=kind==='place'?state.places:state.groups,entry=arr.find(x=>x.id===root.dataset[kind+'Id']);if(!entry)return;entry[key]=e.target.type==='checkbox'?e.target.checked:e.target.value;if(key==='name')root.querySelector('.rep-head strong').textContent=`${kind==='place'?'Miejsce':'Grupa'} ${arr.indexOf(entry)+1}: ${entry.name||'bez nazwy'}`;refresh();}
 $('#places').addEventListener('click',e=>{const btn=e.target.closest('[data-delete-place]');if(!btn)return;if(!confirm('Usunąć to miejsce? Przydziały grup do niego zostaną wyczyszczone.'))return;state.places=state.places.filter(x=>x.id!==btn.dataset.deletePlace);state.groups.forEach(g=>{if(g.placeId===btn.dataset.deletePlace)g.placeId=''});renderPlaces();renderGroups();refresh();});
 $('#groups').addEventListener('click',e=>{const btn=e.target.closest('[data-delete-group]');if(!btn)return;state.groups=state.groups.filter(x=>x.id!==btn.dataset.deleteGroup);renderGroups();refresh();});
 $('#roles').addEventListener('input',e=>{const {role,key}=e.target.dataset;if(!role||!key)return;if(!state.roles[role])state.roles[role]={person:'',deputy:''};state.roles[role][key]=e.target.value;refresh()});
 $('#equipment').addEventListener('change',e=>{if(e.target.dataset.gear)state.gear[e.target.dataset.gear]=e.target.value;refresh();});
 $('#generator-form').addEventListener('input',e=>{if(e.target.name)refresh()});$('#generator-form').addEventListener('change',e=>{if(e.target.name)refresh()});
 $('#generator-form').addEventListener('submit',e=>e.preventDefault());
 $('#insert-scenarios').onclick=()=>{
  const proposals={
   scenarioBreak:'Nauczyciele i pracownicy dyżurujący obejmują opieką dzieci przebywające poza salami. Kierują je wyznaczonymi trasami wewnętrznymi do uzgodnionych miejsc, sprawdzają dostępne pomieszczenia wspólne i przekazują meldunek. Dostosować do budynku i dyżurów.',
   scenarioOutside:'Opiekunowie prowadzą dzieci najkrótszą wcześniej sprawdzoną drogą do odpowiedniej osłoniętej części budynku, zgodnie z aktualnymi komunikatami. Nie organizują zbiórki na boisku ani w otwartej przestrzeni. Dostosować do dostępnych wejść.',
   scenarioTrip:'Opiekun sprawdza oficjalne ostrzeżenia i najbliższe dostępne miejsce osłony; unika ryzykownego powrotu przez otwarty teren. Informuje dyrekcję o lokalizacji, liczbie dzieci i sytuacji. Ustalić kanał awaryjny.',
   scenarioTransport:'Osoba wyznaczona kontaktuje się z przewoźnikiem i opiekunami. Nie podejmuje decyzji o kontynuowaniu przejazdu przez rejon zagrożenia bez uwzględnienia komunikatów właściwych służb. Ustalić zasady na konkretnych trasach.',
   scenarioBlocked:'Nie korzystać z uszkodzonego przejścia. Opiekun zgłasza położenie grupy, ocenia dostępne bezpieczne warianty wewnątrz budynku i stosuje polecenia służb. Nie podejmuje prób przejścia przez strefę zagrożoną.',
   scenarioOutage:'Wykorzystać ustalony sygnał i łączność zapasową, sprawdzone latarki oraz dostęp do list obecności bez internetu. Wyznaczyć osoby przekazujące meldunki i zasady postępowania przy przedłużonym pobycie.',
   scenarioChemical:'Postępować zgodnie z aktualnymi komunikatami właściwych organów i służb; nie podejmować działań zwiększających narażenie. W zależności od rodzaju zagrożenia stosować właściwe instrukcje ochrony przed skażeniem.'
  };
  let count=0;
  for(const [name,text] of Object.entries(proposals)){const el=$(`[name="${name}"]`);if(el&&!clean(el.value)){el.value=text;count++;}}
  refresh();toast(count?`Wstawiono ${count} roboczych propozycji. Sprawdź je wspólnie z dyrekcją.`:'Wszystkie pola zawierają już treść.');
 };

 $('#export-ack').onchange=e=>$('#export-docx').disabled=!e.target.checked;
 $('#export-docx').onclick=()=>{try{const d=data(),a=audit(d);const bytes=makeDOCX(d,a);const name=(clean(d.fields.schoolName)||'placowka').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9-]/gi,'-').replace(/-+/g,'-').slice(0,48).toLowerCase();download(new Blob([bytes],{type:'application/vnd.openxmlformats-officedocument.wordprocessingml.document'}),`procedura-zagrozenie-z-powietrza-${name}.docx`);toast('Plik Word przygotowany. Sprawdź ostrzeżenia w dokumencie i dołącz rzuty kondygnacji.');}catch(err){console.error(err);alert('Nie udało się utworzyć pliku Word: '+err.message);}};
 $('#save-json').onclick=saveProject;
 $('#load-json').onchange=async e=>{try{const file=e.target.files?.[0];if(!file)return;const payload=JSON.parse(await file.text());loadProject(payload);toast('Wczytano lokalny projekt JSON.');}catch(err){alert('Nie można wczytać projektu: '+err.message);}finally{e.target.value='';}};
 $('#reset').onclick=()=>{if(confirm('Wyczyścić wszystkie dane bez możliwości cofnięcia? Najpierw możesz zapisać projekt JSON.'))resetAll();};
 $('#load-demo').onclick=()=>{if(state.places.length||state.groups.length||clean($('[name="schoolName"]').value)){if(!confirm('Dane przykładowe zastąpią obecny projekt. Kontynuować?'))return;}loadProject(demoData());toast('Wstawiono wyłącznie fikcyjne dane demonstracyjne.');};
 refresh();go(0,false);
}
function demoData(){const p1='old1',p2='old2';const F={schoolType:'szkoła',schoolName:'Przykładowa Szkoła Podstawowa nr 1',schoolAddress:'ul. Przykładowa 1, Miasto Testowe',authority:'Gmina Testowa',manager:'Gmina Testowa',director:'Dyrektor placówki',approvalDate:'',reviewDate:'',docVersion:'DEMO',docLocation:'sekretariat szkoły',formal_organ:false,formal_manager:false,formal_civil:false,formal_technical:false,formalNotes:'WERSJA DEMONSTRACYJNA: brak prawdziwych uzgodnień',pupils:'68',staff:'12',visitors:'4',hours:'7:00–17:00',buildings:'1',minimumStaff:'6',specialNeeds:'tak',supportCoordinator:'pedagog specjalny',supportPlan:'Do ustalenia indywidualne wsparcie i droga dostępna. Wersja demonstracyjna.',unassignedPlan:'Nauczyciel dyżurujący kieruje osoby do przyjętego miejsca; prowadzi meldunki.',sources:'Komunikaty właściwych organów, Alert RCB, radio',signal:'Jednoznaczny komunikat słowny przez radiowęzeł',signalDistinct:'Słowny komunikat inny niż sygnał ewakuacji pożarowej',signalBackup:'radiotelefony i wyznaczeni pracownicy',reportRecipient:'koordynator miejsca → dyrektor',reportBackup:'radiotelefon',alarmText:'Alarm. Proszę przejść z grupą do wyznaczonego miejsca. Pozostawić rzeczy. Odejść od okien.',scenarioBreak:'Nauczyciele dyżurujący kierują uczniów do przypisanych miejsc, sprawdzają toalety i korytarze.',scenarioOutside:'Opiekun natychmiast kieruje grupę do najbliższego bezpiecznego wejścia i dalej do wcześniej wyznaczonego miejsca w budynku.',scenarioTrip:'Opiekun postępuje według komunikatów i miejsca aktualnego pobytu, informuje szkołę.',scenarioTransport:'Wstrzymanie rozpoczynania przewozów, kontakt z kierowcą i operatorem transportu.',scenarioBlocked:'Wariant wewnętrzny i meldunek lokalizacji; brak samodzielnych prób pokonywania zagrożonej strefy.',scenarioOutage:'Latarki, zapasowe komunikaty i listy obecności offline.',scenarioChemical:'Stosowanie bieżących komunikatów właściwych organów.',parentChannel:'e-dziennik',parentBackup:'SMS',pickupPoint:'punkt odbioru wskazany po odwołaniu alarmu',parentApprover:'dyrektor',parentNotes:'Odbiór po sprawdzeniu uprawnień.',supplyDeficits:'DANE PRZYKŁADOWE: test kompletności sprzętu.',drillStage:'nie rozpoczęto',lastDrill:'',nextDrill:'',drillKeeper:'koordynator',planRef:'',planDate:'',plans:'',drillNotes:''};return {version:STATE_VERSION,example:true,fields:F,places:[{id:p1,name:'Wewnętrzny korytarz',kind:'room',building:'A',floor:'parter',capacity:'35',confirmed:false,basis:'',exits:'unknown',glass:'good',access:'yes',accessible:'yes',outside:false,notes:'Wyłącznie przykład'},{id:p2,name:'Pomieszczenie przyziemia',kind:'room',building:'A',floor:'-1',capacity:'35',confirmed:false,basis:'',exits:'unknown',glass:'good',access:'yes',accessible:'partial',outside:false,notes:'Wyłącznie przykład'}],groups:[{id:'g1',name:'1A',children:'25',escorts:'2',origin:'sala 10',placeId:p1,route:'korytarz wewnętrzny',backup:'pozostanie w najbliższej osłoniętej części',outside:false,minutes:'',leader:'nauczyciel 1A',deputy:'opiekun',support:''},{id:'g2',name:'2B',children:'24',escorts:'2',origin:'sala 21',placeId:p2,route:'wewnętrzna klatka A',backup:'wewnętrzna klatka B – do sprawdzenia',outside:false,minutes:'',leader:'nauczyciel 2B',deputy:'opiekun',support:''}],roles:{director:{person:'dyrektor',deputy:'wicedyrektor'},movement:{person:'wicedyrektor',deputy:'pracownik wyznaczony'},shelter:{person:'koordynator',deputy:'zastępca koordynatora'}},gear:{keys:'yes',routes:'yes',lights:'partial',lists:'yes',firstaid:'yes'}};}

// ——— Generowanie pliku .docx bez usług zewnętrznych ani bibliotek CDN ———
const X=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const humanBool=v=>v?'TAK':'NIE / NIE POTWIERDZONO';
const humanStatus=v=>({'yes':'Tak, sprawdzone','partial':'Częściowo','no':'Brak / nie','unknown':'Nie zweryfikowano'}[v]||'Nie zweryfikowano');
const humanKind=v=>(KIND.find(x=>x[0]===v)||KIND[0])[1];
const humanDate=s=>!s?'[DO UZUPEŁNIENIA]':/^\d{4}-\d{2}-\d{2}$/.test(s)?s.split('-').reverse().join('.'):s;
const pp=(t,style='Normal')=>{const lines=String(t??'').split('\n');return `<w:p><w:pPr><w:pStyle w:val="${style}"/><w:spacing w:after="120"/></w:pPr>${lines.map((part,i)=>`${i?'<w:r><w:br/></w:r>':''}<w:r><w:t xml:space="preserve">${X(part)}</w:t></w:r>`).join('')}</w:p>`};
const p0=(t,style='Normal')=>pp(t,style);
const h1=t=>String(t).startsWith('ZAŁĄCZNIK')?`<w:p><w:pPr><w:pStyle w:val="Heading1"/><w:pageBreakBefore/></w:pPr><w:r><w:t>${X(t)}</w:t></w:r></w:p>`:pp(t,'Heading1');const h2=t=>pp(t,'Heading2'),h3=t=>pp(t,'Heading3');
const bullet=t=>pp('•  '+t,'Bullet');
const pairs=(...rows)=>rows.map(r=>pp(r[0]+': '+noBlank(r[1]))).join('');
function table(head,body){
 const colNum=head.length,total=9750,base=Math.floor(total/colNum),widths=Array.from({length:colNum},(_,i)=>i===colNum-1?total-base*(colNum-1):base);
 const cells=(values,header=false)=>`<w:tr>${values.map((v,i)=>`<w:tc><w:tcPr><w:tcW w:w="${widths[i]||base}" w:type="dxa"/>${header?'<w:shd w:fill="E6F0F2"/>':''}</w:tcPr>${pp(v==null?'':String(v),header?'TableHead':'TableText')}</w:tc>`).join('')}</w:tr>`;
 return `<w:tbl><w:tblPr><w:tblW w:w="${total}" w:type="dxa"/><w:tblLayout w:type="fixed"/><w:tblBorders><w:top w:val="single" w:sz="5" w:color="B6C7D3"/><w:left w:val="single" w:sz="5" w:color="B6C7D3"/><w:bottom w:val="single" w:sz="5" w:color="B6C7D3"/><w:right w:val="single" w:sz="5" w:color="B6C7D3"/><w:insideH w:val="single" w:sz="4" w:color="D5E0E7"/><w:insideV w:val="single" w:sz="4" w:color="D5E0E7"/></w:tblBorders><w:tblCellMar><w:top w:w="80" w:type="dxa"/><w:bottom w:w="80" w:type="dxa"/><w:left w:w="85" w:type="dxa"/><w:right w:w="85" w:type="dxa"/></w:tblCellMar></w:tblPr><w:tblGrid>${widths.map(w=>`<w:gridCol w:w="${w}"/>`).join('')}</w:tblGrid>${cells(head,true)}${(body.length?body:[Array(head.length).fill('DO UZUPEŁNIENIA')]).map(x=>cells(x)).join('')}</w:tbl>`;
}
const pageBreak=()=>''; // Podział strony realizuje pageBreakBefore nagłówka załącznika.
function makeDOCX(d,a){
 const f=d.fields,p=d.places,g=d.groups,roles=d.roles,gear=d.gear,lines=[];const add=s=>lines.push(s);const put=(label,value)=>add(pp(`${label}: ${noBlank(value)}`));
 const persons=a.people,cap=a.capacity,capacityGap=Math.max(0,persons-cap);
 const role=(k)=>(roles[k]||{});const field=k=>noBlank(f[k]);
 const condition=p.length?p.map(z=>`${z.name||'miejsce bez nazwy'} — ${z.confirmed?'pojemność potwierdzona':'pojemność niepotwierdzona'}`).join('; '):'[BRAK WSKAZANYCH MIEJSC]';
 const noteText=(k,fallback)=>clean(f[k])||fallback||'[DO UZUPEŁNIENIA W PLACÓWCE]';
 add(pp('BEZPIECZNE DZIECI  |  PROJEKT ORGANIZACYJNY','Kicker'));
 add(pp('PROCEDURA PRZYGOTOWANIA I REAGOWANIA','Title'));
 add(pp('w szkole lub przedszkolu po otrzymaniu komunikatu o zagrożeniu z powietrza, ogłoszeniu alarmu i jego odwołaniu','Subtitle'));
 add(pp(d.example?'WERSJA DEMONSTRACYJNA — DANE FIKCYJNE, NIE WDRAŻAĆ':'PROJEKT DO WERYFIKACJI I ZATWIERDZENIA','Warning'));
 add(table(['Metryka dokumentu','Dane'],[['Placówka',field('schoolName')],['Adres',field('schoolAddress')],['Organ prowadzący',field('authority')],['Właściciel / zarządca',field('manager')],['Zatwierdzający',field('director')],['Wersja',field('docVersion')],['Data zatwierdzenia',humanDate(f.approvalDate)],['Przegląd',humanDate(f.reviewDate)],['Lokalizacja dokumentacji',field('docLocation')]]));
 add(pp('Dokument wygenerowany za pomocą niezależnego narzędzia BezpieczneDzieci.com. Opiera się na strukturze wzoru przygotowanego przez MEN, MSWiA i RCB (październik 2026). Nie stanowi oceny technicznej, decyzji organu ochrony ludności ani zatwierdzenia gotowości placówki. Właściwe komunikaty i polecenia służb mają pierwszeństwo.','Small'));
 add(pp(`Automatyczna kontrola formularza: ${a.critical} uwag krytycznych, ${a.important} innych uwag, kompletność ${completion(d)}%. Wynik nie jest oceną bezpieczeństwa obiektu.`,'Warning'));
 add(h1('1. Zakres i zasady stosowania'));
 add(pp(`Procedura dotyczy przygotowania placówki ${field('schoolName')} do zagrożenia z powietrza, odbioru ostrzeżeń, przemieszczenia osób do uprzednio wyznaczonych miejsc wewnątrz budynku, ich dalszej opieki i bezpiecznego zakończenia działań. Obejmuje uczniów, dzieci, pracowników i osoby przebywające na terenie placówki. Odrębne zasady ochrony przeciwpożarowej i ewakuacji obowiązują przy pożarze, zadymieniu oraz innych zagrożeniach.`));
 add(pp('W czasie ogłoszonego alarmu co do zasady nie wyprowadza się dzieci i uczniów przez otwartą przestrzeń do odległego miejsca schronienia. Wyjątek może wynikać z bezpośredniego zagrożenia życia lub zdrowia w budynku i polecenia właściwego organu lub służb wskazujących bezpieczny sposób opuszczenia budynku.'));
 add(h1('2. Przygotowanie budynku i miejsc schronienia'));
 add(h2('2.1. Status i uzgodnienia'));
 add(pp(`Organ prowadzący: ${field('authority')}. Właściciel / zarządca: ${field('manager')}. Pisemne ustalenia: ${FORMAL.map(([k,v])=>`${v} — ${humanBool(f['formal_'+k])}`).join('; ')}.`));
 add(pp(`Dokumenty i protokoły: ${field('formalNotes')}. Odpowiedzialność za weryfikację konstrukcji, stanu technicznego, sposobu użytkowania i wymaganych formalności należy do właściwych podmiotów. Dyrektor nie nadaje samodzielnie statusu schronu, ukrycia, MDS lub punktu schronienia.`));
 add(h2('2.2. Wybór i użytkowanie pomieszczeń'));
 add(pp('Przy wyborze należy rozpatrzyć przede wszystkim istniejące i dostępne miejsca ochrony o potwierdzonym statusie, a przy ich braku lub niedoborze miejsca wewnętrzne wskazane organizacyjnie po właściwych uzgodnieniach. Weryfikuje się dokumentację, wybraną kondygnację, oszklenie, możliwości osłony, liczbę wyjść, stan dróg wewnętrznych, wentylację, dostępność, klucze oraz możliwości opieki przez przewidywany czas pobytu.'));
 add(pp(`Wskazane miejsca: ${condition}. Liczba osób mogących jednocześnie przebywać w placówce: ${fmt(persons)} (dzieci ${fmt(num(f.pupils))}, pracownicy ${fmt(num(f.staff))}, pozostali ${fmt(num(f.visitors))}). Potwierdzona pojemność wewnętrzna według deklaracji: ${fmt(cap)}. ${capacityGap?`NIEDOBÓR: ${fmt(capacityGap)} miejsc. Konieczne zawiadomienie organu prowadzącego i właściwego organu ochrony ludności oraz uzupełnienie uzgodnień.`:'Po porównaniu wartości nominalnych nie wykazano niedoboru ogólnej pojemności; odrębnego potwierdzenia wymagają konkretne przydziały i faktyczna dostępność.'}`));
 add(pp('Pojemności robocze i niepotwierdzone nie mogą być traktowane w niniejszym dokumencie jako potwierdzone. Pojemności nie ustala się wyłącznie na podstawie metrażu ani domniemanej odporności ścian. Nie wolno planować przekraczania pojemności potwierdzonych.'));
 add(h2('2.3. Warunki użytkowe'));
 add(pp('Drogi wewnętrzne i wyjścia muszą być drożne; drzwi nie mogą utrudniać opuszczenia stref i muszą odpowiadać wymaganiom ochrony przeciwpożarowej. Dostęp do pomieszczeń i kluczy sprawdza się w godzinach funkcjonowania. Zapewnia się sposób alarmowania, meldowania i odbioru informacji także bez prądu i internetu, dostępność list obecności, podstawową pierwszą pomoc i uzgodnione zaopatrzenie.'));
 add(pp(`Ujawnione niedobory: ${field('supplyDeficits')}. Szczegółowa lista kontrolna znajduje się w części 7 i załączniku 9.`));
 add(h1('3. Przygotowanie organizacyjne'));
 add(h2('3.1. Zadania, obsada, zastępstwa'));
 add(pp('Dyrektor wyznacza wykonawców i zastępców także na początek i koniec dnia, przy nieobecnościach i w trakcie dyżurów. Nauczyciele prowadzą grupy, sprawdzają obecność, przekazują meldunki i pozostają z podopiecznymi. Osoby wyznaczone obsługują części wspólne, zatory, łączność, pierwszą pomoc, miejsca schronienia i komunikaty dla rodziców. Konkretny wykaz zawiera załącznik 5.'));
 add(h2('3.2. Ostrzeganie i łączność'));
 add(pairs(['Źródła ostrzegania',field('sources')],['Wewnętrzny sygnał',field('signal')],['Różnica wobec ewakuacji pożarowej',field('signalDistinct')],['Sposób alarmowania zastępczego',field('signalBackup')],['Adresat meldunków',field('reportRecipient')],['Zapasowy sposób meldowania',field('reportBackup')]));
 add(h2('3.3. Przygotowanie dzieci i pracowników'));
 add(pp('Najpierw ćwiczy personel, potem pojedyncze grupy, a dopiero po poprawieniu błędów — cała placówka. Dzieci i uczniów przygotowuje się spokojnie i odpowiednio do wieku. Ćwiczenia nie zawierają odgłosów wybuchów ani bodźców wywołujących lęk. Ćwiczenia schronienia nie zastępują ćwiczeń ewakuacji przeciwpożarowej.'));
 add(h2('3.4. Osoby wymagające pomocy'));
 add(pp(`Rozpoznanie potrzeb wsparcia: ${field('specialNeeds')}. Koordynator: ${field('supportCoordinator')}. Rozwiązania: ${field('supportPlan')}. Szczegółowe dane dzieci, dokumentacja medyczna i indywidualne ustalenia dostępne są tylko upoważnionym osobom w chronionych dokumentach placówki.`));
 add(h1('4. Rozpoznanie alarmu i komunikatów'));
 add(pp('Placówka korzysta z oficjalnych ostrzeżeń i komunikatów: Alert RCB, Regionalny System Ostrzegania, syreny, radio i telewizja oraz właściwe urzędy i służby. Syrena z modulowanym dźwiękiem przez trzy minuty oznacza ogłoszenie alarmu dla ludności; trzyminutowy dźwięk ciągły jest sygnałem odwołania. Treść i rodzaj zagrożenia należy sprawdzać w oficjalnych komunikatach. Samo ustanie dźwięku syreny nie stanowi odwołania alarmu.'));
 add(pp('Komunikaty mogą obejmować fazy czujności, gotowości i alarmu. Po autentycznym i jednoznacznym poleceniu natychmiastowego schronienia uruchamia się działania bez zwłoki. Wewnętrzny komunikat powinien być rozróżnialny od sygnału pożarowego, słyszalny w części użytkowej obiektu i możliwy do przekazania zastępczo.'));
 add(pp(`Treść ustalonego komunikatu: ${noteText('alarmText','Alarm. Proszę natychmiast przejść z grupą do wyznaczonego miejsca. Pozostawić rzeczy i odejść od okien.')}`));
 add(h1('5. Postępowanie po ogłoszeniu alarmu'));
 add(pp('Nauczyciel przerywa zajęcia, poleca pozostawić rzeczy i spokojnie przejść do ustalonego wewnętrznego miejsca schronienia. Jeżeli nie powoduje to opóźnienia, zabezpiecza urządzenia mogące wywołać pożar. Zabiera dostępny wykaz obecności, środek łączności i wymagane, wcześniej przygotowane produkty lecznicze. Prowadzi grupę, a osoba wspierająca nadzoruje jej koniec. Nie korzysta się z windy, nie biega ani nie wraca po przedmioty.'));
 add(pp('Stosuje się wyznaczoną drogę podstawową lub, jeśli jest niedostępna, sprawdzoną trasę alternatywną. Jeżeli przejście jest niemożliwe, grupa wykorzystuje najbliższe osłonięte pomieszczenie i podaje miejsce pobytu koordynatorowi. Nie prowadzi się grup przez dziedziniec, boisko, parking lub ulicę w celu dojścia do odległego miejsca schronienia.'));
 add(pp(`Podział grup i tras określają załączniki 2 i 4. Dla osób przebywających poza przypisanymi grupami ustalono: ${field('unassignedPlan')}.`));
 add(h1('6. Sprawdzenie obecności, pobyt i pierwsza pomoc'));
 add(pp('Po wejściu nauczyciel sprawdza wszystkich podopiecznych na podstawie aktualnej listy i przekazuje meldunek: miejsce, grupa, osoby obecne, brakujące, poszkodowane i wymagające wsparcia. Obecność sprawdza się ponownie po każdym przemieszczeniu. Przy ustalaniu liczby osób uwzględnia się także pracowników i gości; koordynator nie dopuszcza do przekroczenia potwierdzonej pojemności miejsca.'));
 add(pp('W pomieszczeniach utrzymuje się spokój, opiekę, możliwość przyjmowania urzędowych komunikatów i dostęp do odpowiedniej pomocy. Dzieci nie wracają do sal po rzeczy ani nie przemieszczają się samodzielnie w poszukiwaniu rodzeństwa. Poszkodowanym udziela się pierwszej pomocy w zakresie posiadanych umiejętności. W razie potrzeby wzywa się pomoc pod numerem 112 i postępuje według poleceń dyspozytora.'));
 add(h1('7. Uszkodzenie budynku i zagrożenia współwystępujące'));
 add(h2('7.1. Wybuch lub uszkodzenie obiektu'));
 add(pp('Osoby chronią głowę i kark i pozostają możliwie nisko. Gdy bezpośrednie oddziaływanie ustanie, personel ocenia widoczne zagrożenia, poszkodowanych i dostępne drogi. Nie podchodzi do miejsc potencjalnie naruszonej konstrukcji. Jeżeli dalszy pobyt stanowi bezpośrednie zagrożenie życia, realizuje bezpieczny wariant przemieszczenia zgodnie z aktualną sytuacją i poleceniami służb.'));
 add(h2('7.2. Pożar, dym lub ulatniający się gaz'));
 add(pp('Nie pozostaje się w pomieszczeniu zagrożonym pożarem, dymem lub gazem. Należy ominąć zagrożone odcinki, wezwać pomoc i wykonywać polecenia służb. W razie podejrzenia ulatniania się gazu nie używa się przełączników elektrycznych ani otwartego ognia. Instalacje obsługuje wyłącznie uprawniona lub właściwie przeszkolona osoba, jeżeli nie wiąże się to z narażeniem życia.'));
 add(h2('7.3. Skażenie, szczątki i problemy techniczne'));
 add(pp('W razie komunikatu o zagrożeniu chemicznym wykonuje się konkretne zalecenia właściwych organów, dotyczące np. ograniczenia dopływu zanieczyszczonego powietrza. Nie podaje się produktów leczniczych profilaktycznie poza obowiązującymi zasadami i poleceniami medycznymi. Nie dotyka się podejrzanych przedmiotów, szczątków ani niewybuchów; miejsce zgłasza się pod numer 112. Przy zaniku prądu lub łączności stosuje się sprawdzone rozwiązania zastępcze.'));
 add(pairs(['Wariant po zablokowaniu przejścia',field('scenarioBlocked')],['Zanik energii i łączności',field('scenarioOutage')],['Skażenie lub inne zagrożenie',field('scenarioChemical')]));
 add(h1('8. Rodzice, odwołanie alarmu i odbiór dzieci'));
 add(pp(`Komunikaty zatwierdza: ${field('parentApprover')}. Kanał podstawowy: ${field('parentChannel')}; zastępczy: ${field('parentBackup')}. Podczas alarmu dzieci pozostają pod opieką placówki. Rodzice nie powinni podjeżdżać pod budynek, blokować dojazdu służbom ani dzwonić do nauczycieli opiekujących się grupami.`));
 add(pp(`Po oficjalnym odwołaniu alarmu i sprawdzeniu warunków dalszego pobytu oraz wyjścia dyrektor określa tryb powrotu, zakończenia zajęć i odbioru. Punkt przekazania: ${field('pickupPoint')}. Zasady sprawdzenia osoby odbierającej i rejestracji: ${field('parentNotes')}. Samo ustanie dźwięku syreny nie uprawnia do samodzielnego zakończenia działań.`));
 add(h1('9. Dodatkowe zasady dla szkoły'));
 add(pp('Pracownicy sprawują opiekę nad klasami, uczniami pozostającymi na świetlicy, w bibliotece, gabinetach, toalecie, sali gimnastycznej, na boisku i w trakcie przerw. Uczeń poza grupą zgłasza się do najbliższego wyznaczonego pracownika. Uczniowie ze szczególnymi potrzebami otrzymują wcześniej ustalone wsparcie. Nie przewiduje się samodzielnego przemieszczania uczniów z zewnątrz przez obszar objęty alarmem w celu dotarcia do budynku.'));
 add(pairs(['Alarm podczas przerwy',field('scenarioBreak')],['Alarm na boisku',field('scenarioOutside')],['Wycieczki / wyjścia',field('scenarioTrip')],['Dowóz',field('scenarioTransport')]));
 add(h1('10. Dodatkowe zasady dla przedszkola'));
 add(pp(f.schoolType==='szkoła'?'Ten rozdział jest informacyjny i może zostać usunięty przez dyrektora, jeżeli w placówce nie ma oddziałów przedszkolnych.':'Opiekun prowadzi grupę spokojnie, z pomocą przypisanych pracowników. Dzieci śpiące budzi się krótkim poleceniem, nie tracąc czasu na ubieranie. Dla dzieci niechodzących samodzielnie należy przewidzieć bezpieczny sprzęt i realną obsadę personelu. Nie przenosi się grupy dzieci w pościeli, materacu ani niestabilnym meblu. Podczas alarmu nie przekazuje się dzieci rodzicom.'));
 if(f.schoolType==='szkoła')add(pp('Jeśli placówka prowadzi oddziały przedszkolne, należy uzupełnić szczegółowy wariant z uwzględnieniem wieku dzieci, obsady zmianowej, sposobu przemieszczania osób niesamodzielnych i wyposażenia.'));
 add(h1('11. Ćwiczenia, kontrola i analiza zdarzeń'));
 add(pp(`Etap przygotowania: ${field('drillStage')}. Ostatnie ćwiczenie: ${humanDate(f.lastDrill)}. Kolejne: ${humanDate(f.nextDrill)}. Odpowiedzialny za rejestr: ${field('drillKeeper')}. Wyniki i braki: ${field('drillNotes')}.`));
 add(pp('Ćwiczy się kolejno: pracowników, pojedyncze grupy, następnie całą placówkę po poprawkach. Uwzględnia się różne pory i lokalizacje, zablokowaną drogę, brak energii i łączności. Mierzy się realne czasy przejścia, rejestruje zatory, liczbę obecnych i wykonanie meldunków oraz wyznacza osoby i terminy korekt. Po zmianie warunków, przydziału, dostępności miejsca lub zdarzeniu aktualizuje się procedurę.'));
 add(h1('12. Działania niedopuszczalne'));
 ['Wyprowadzanie po alarmie grup przez otwartą przestrzeń do odległego miejsca schronienia, z wyjątkiem sytuacji bezpośredniego zagrożenia życia i zgodnie z poleceniami służb.','Zwlekanie z reakcją na autentyczny, jednoznaczny alarm albo polecenie natychmiastowego schronienia.','Samodzielne nadawanie pomieszczeniom statusu schronu, ukrycia, MDS lub punktu schronienia bez właściwej podstawy.','Planowanie przekraczania potwierdzonej pojemności miejsca ochrony.','Wydawanie dzieci rodzicom albo uruchamianie dowozu w czasie alarmu.','Blokowanie wyjść, powrót po rzeczy, korzystanie z windy, publikowanie niepotwierdzonych informacji lub ujawnianie danych wrażliwych uczniów.'].forEach(t=>add(bullet(t)));
 add(h1('13. Wdrożenie i aktualizacja'));
 add(pp(`Za wdrożenie odpowiada: ${field('director')}. Wersja: ${field('docVersion')}. Termin przeglądu: ${humanDate(f.reviewDate)}. Przed podpisaniem należy ukończyć pisemne uzgodnienia, dołączyć zweryfikowane rzuty, skorygować przydziały, potwierdzić drożność tras i stan wyposażenia, obsadzić zastępstwa i przeprowadzić adekwatne ćwiczenia. Przeglądu dokonuje się po zmianach budynku, liczebności, personelu, statusu miejsca oraz po ćwiczeniach lub zdarzeniach.`));
 add(pp('Dokument do zatwierdzenia: ..................................................     Data i podpis: ..................................................'));

 // Załączniki zgodne zakresowo z ministerialnym wzorcem (autorskie opracowanie tabel i treści)
 add(pageBreak());add(h1('ZAŁĄCZNIK 1. Dane placówki i ustalenia formalne'));
 add(table(['Element','Ustalenie / wynik'],[['Nazwa i adres',`${field('schoolName')}, ${field('schoolAddress')}`],['Organ prowadzący',field('authority')],['Właściciel / zarządca',field('manager')],['Typ placówki',field('schoolType')],['Godziny pracy',field('hours')],['Liczba budynków',field('buildings')],['Liczba dzieci',fmt(num(f.pupils))],['Liczba pracowników',fmt(num(f.staff))],['Liczba innych osób',fmt(num(f.visitors))],['Największa jednoczesna liczba osób',fmt(persons)],['Minimalna obsada na zmianie',field('minimumStaff')],['Osoby wymagające wsparcia – organizacja',field('supportPlan')],['Korespondencja i protokoły',field('formalNotes')],...FORMAL.map(([k,t])=>[t,humanBool(f['formal_'+k])])]));
 add(pp('Ustalenia należy potwierdzić w dokumentacji placówki. Pola „tak” opisują wyłącznie deklarację wprowadzającego dane – nie zastępują dokumentu źródłowego.','Small'));
 add(pageBreak());add(h1('ZAŁĄCZNIK 2. Miejsca schronienia i przydział grup'));
 for(const [i,z] of p.entries()){add(h2(`${i+1}. ${z.name||'Miejsce bez oznaczenia'}`));add(table(['Element','Ustalenie'],[['Lokalizacja',`${z.building||'budynek nieustalony'}; ${z.floor||'kondygnacja nieustalona'}`],['Status miejsca',humanKind(z.kind)],['Pojemność',`${num(z.capacity)} osób – ${z.confirmed?'zadeklarowana jako potwierdzona':'NIEPOTWIERDZONA'}`],['Podstawa statusu / pojemności',noBlank(z.basis)],['Wyjścia / dojście',`${z.exits==='two'?'co najmniej 2 wyjścia':'WERYFIKACJA WYJŚĆ WYMAGANA'}; dostęp: ${z.access==='yes'?'sprawdzony':'DO SPRAWDZENIA'}`],['Dostępność i przeszklenia',`dla osób ze szczególnymi potrzebami: ${z.accessible}; przeszklenia: ${z.glass}`],['Uwagi / ograniczenia',noBlank(z.notes)]]));}
 if(!p.length)add(pp('BRAK ZDEFINIOWANYCH MIEJSC. DO UZUPEŁNIENIA PRZED ZATWIERDZENIEM.','Warning'));
 add(pp('Przestrzeń poza budynkiem nie może być traktowana jak droga do odległego miejsca schronienia w trakcie alarmu. Status ochronny wymaga właściwej podstawy. Pojemności niepotwierdzone nie są wliczane do bilansu potwierdzonych miejsc.','Small'));
 add(h2('Przydział grup'));
 add(table(['Grupa / lokalizacja','Dzieci + opiekunowie','Miejsce docelowe','Osoba prowadząca'],g.map(x=>[`${x.name||'BEZ NAZWY'}; ${x.origin||'brak lokalizacji'}`,`${num(x.children)} + ${num(x.escorts)} = ${num(x.children)+num(x.escorts)}`,p.find(z=>z.id===x.placeId)?.name||'BRAK PRZYDZIAŁU',noBlank(x.leader)])));
 add(h2('Bilans miejsc'));
 add(table(['Miejsce','Przydział grup (dzieci + opiekunowie)','Pojemność zgłoszona','Wynik kontroli'],p.map(z=>{const occ=a.occupancy.get(z.id)||0;const confirmed=z.confirmed&&!z.outside;return [z.name||'BEZ NAZWY',fmt(occ),`${fmt(num(z.capacity))}${confirmed?' – potwierdzona':' – NIEPOTWIERDZONA'}`,!confirmed?'POTWIERDZIĆ':occ>num(z.capacity)?'PRZEKROCZENIE!':'Nie przekroczono na podstawie wpisu'];})));
 add(pp(`Łączna liczba osób: ${fmt(persons)}. Potwierdzona pojemność miejsc wewnątrz budynku: ${fmt(cap)}. Przydziały grup uwzględniają: ${fmt(a.assignedTotal)} osób. Pozostałe osoby i pracownicy muszą mieć rzeczywiste, niewykorzystane miejsca w bilansie; brak możliwości przydziału należy zgłosić właściwym podmiotom.`));
 add(pageBreak());add(h1('ZAŁĄCZNIK 3. Plan budynku z miejscami schronienia'));
 add(pairs(['Oznaczenie plansz / rzutów',field('planRef')],['Data ostatniej weryfikacji',humanDate(f.planDate)],['Miejsce przechowywania',field('plans')]));
 add(pp('DOŁĄCZYĆ PRZED ZATWIERDZENIEM: aktualne rzuty wszystkich odpowiednich kondygnacji z oznaczeniami miejsc, pojemnością, wejściami, wyjściami, drogami podstawowymi i zastępczymi, przeszklonymi strefami zagrożenia, apteczkami, punktami meldunków oraz miejscami dostępu dla służb. Zweryfikować datę planów i zgodność ze stanem rzeczywistym.','Warning'));
 add(pp('Rysunki są materiałem wewnętrznym. Nie publikować w internecie wersji zawierających szczegółowe trasy, zabezpieczenia i rozwiązania organizacyjne.'));
 add(pp('Miejsce na wstawienie / dołączenie rzutów kondygnacji:'));add(pp('[WSTAW RZUTY I DOKUMENTACJĘ ZATWIERDZONĄ LOKALNIE – NIE BYŁY WYSYŁANE DO SERWISU]','Warning'));
 add(pageBreak());add(h1('ZAŁĄCZNIK 4. Przemieszczanie z poszczególnych lokalizacji'));
 for(const [i,x] of g.entries()){add(h2(`${i+1}. ${x.name||'Grupa bez nazwy'}`));add(table(['Element','Ustalenie'],[['Punkt startowy',noBlank(x.origin)],['Dzieci / opiekunowie',`${num(x.children)} / ${num(x.escorts)}`],['Miejsce docelowe',p.find(z=>z.id===x.placeId)?.name||'BRAK PRZYDZIAŁU'],['Droga podstawowa',`${noBlank(x.route)}${x.outside?' — KRYTYCZNE: PRZEJŚCIE ZEWNĘTRZNE!':''}`],['Wariant zastępczy',noBlank(x.backup)],['Czas przejścia – zmierzony',clean(x.minutes)?`${x.minutes} min`:'BRAK POMIARU'],['Prowadzący / zastępca',`${noBlank(x.leader)} / ${noBlank(x.deputy)}`],['Potrzeby wsparcia / wariant',noBlank(x.support)]]));}
 if(!g.length)add(pp('BRAK PRZYDZIAŁÓW GRUP. UZUPEŁNIĆ PRZED ZATWIERDZENIEM.','Warning'));
 add(pp('Jeżeli droga zastępcza nie istnieje, należy przygotować realny wariant pozostania w najbliższym pomieszczeniu ograniczającym ekspozycję, sposób zapewnienia opieki i meldunek lokalizacji. Nie wpisywać hipotetycznych czasów jako „zmierzonych”.'));
 add(pageBreak());add(h1('ZAŁĄCZNIK 5. Podział ról, zadań i zastępstw'));
 const roleTasks={director:['Zatwierdza procedurę i organizuje uzgodnienia.','Uruchamia działania i utrzymuje kontakt z organami.','Podejmuje decyzję o zakończeniu i zleca analizę.'],movement:['Sprawdza przydziały, drogi i obsadę.','Kieruje ruchem i zbiera dane o zatorach.','Nadzoruje powrót / dalszy etap.'],shelter:['Sprawdza przygotowanie miejsca i limity.','Przyjmuje grupy, odbiera meldunki, kontroluje obłożenie.','Rozlicza liczbę osób, przekazuje decyzje.'],information:['Ustala kanały urzędowe i testuje sygnał.','Przekazuje alarm bez zwłoki, zapisuje źródło i czas.','Potwierdza urzędowe odwołanie i przekazuje dyspozycje.'],secretariat:['Przygotowuje rejestr i kontakty.','Zapisuje godziny, decyzje i meldunki.','Kompletuje dokumentację zdarzenia.'],firstaid:['Sprawdza apteczki i przeszkolenie.','Organizuje pierwszą pomoc, wzywa 112 w razie potrzeby.','Przekazuje poszkodowanych właściwym służbom.'],psychology:['Przygotowuje sposoby wsparcia i komunikaty do wieku.','Wspiera osoby reagujące silnym stresem.','Organizuje dalszą pomoc po zdarzeniu.'],accessibility:['Ustala indywidualne wsparcie i sprzęt.','Pomaga dotrzeć do miejsca oraz utrzymuje opiekę.','Pomaga w przemieszczeniu i przekazaniu opiekunom.'],technical:['Kontroluje drogi i instalacje.','Ogranicza dostęp do stref zagrożonych bez ryzykowania życia.','Wspiera oględziny wyłącznie bezpiecznych miejsc.'],entrance:['Zna zasady wejść i drogi wewnętrzne.','Kontroluje wejścia, nie blokuje wyjść i przyjmuje służby.','Pomaga organizować punkt odbioru.'],parents:['Przygotowuje wzory komunikatów i kanały zapasowe.','Wysyła tylko zatwierdzone informacje.','Przekazuje zasady odbioru po odwołaniu alarmu.'],transport:['Przygotowuje kontakt do przewoźników i opiekunów.','Zbiera informacje, koordynuje wstrzymanie przewozów.','Dokumentuje zmianę organizacji dowozu.']};
 add(table(['Funkcja i obsada','Zadania w trzech fazach'],ROLE_DATA.map(([k,n])=>[`${n}\nOsoba / stanowisko: ${noBlank(role(k).person)}\nZastępca: ${noBlank(role(k).deputy)}`,`PRZED: ${roleTasks[k][0]}\nALARM: ${roleTasks[k][1]}\nPO ODWOŁANIU: ${roleTasks[k][2]}`])));
 add(pp('Nauczyciele poszczególnych grup: imienne wyznaczenie osób prowadzących i wspierających na każdej zmianie znajduje się w załączniku 4 lub w aktualnym, wewnętrznym grafiku dyżurów. Nie zakłada się dodatkowych pracowników ponad rzeczywistą obsadę placówki.'));
 add(pageBreak());add(h1('ZAŁĄCZNIK 6. Sytuacje szczególne'));
 add(table(['Sytuacja','Działanie placówki / osoba odpowiedzialna'],[['Przerwa, toalety, korytarze',field('scenarioBreak')],['WF i boisko',field('scenarioOutside')],['Wycieczka i zajęcia poza szkołą',field('scenarioTrip')],['Dowóz / autobus / odbiory',field('scenarioTransport')],['Niedostępna droga, uszkodzenie obiektu',field('scenarioBlocked')],['Brak prądu, wody lub łączności',field('scenarioOutage')],['Skażenie chemiczne lub inne zagrożenie',field('scenarioChemical')],['Osoby poza grupami',field('unassignedPlan')],['Szczególne potrzeby i pomoc',field('supportPlan')]]));
 add(pp('Każdy scenariusz powinien zostać omówiony i sprawdzony. Działania podczas pożaru, gazu lub innego współistniejącego zagrożenia mogą wymagać odmiennej reakcji. Polecenia służb i właściwych organów mają pierwszeństwo.'));
 add(pageBreak());add(h1('ZAŁĄCZNIK 7. Lista kontrolna nauczyciela i meldunek grupy'));
 ['Odbierz jednoznaczny komunikat i przerwij zajęcia.','Poleć odłożyć rzeczy; oddalić się od okien; zachować spokój.','Zabierz dostępną listę obecności, środek łączności i przygotowane, niezbędne środki, jeżeli nie opóźnia to przejścia.','Przemieść grupę wewnątrz budynku wyznaczoną drogą, bez biegu, windy i powrotów po rzeczy.','W miejscu docelowym sprawdź wszystkich obecnych i przekaż meldunek.','Zapewnij opiekę, zgłaszaj potrzeby i kolejne zmiany liczebności.','Nie przekazuj dzieci rodzicom przed odwołaniem alarmu i sprawdzeniem warunków.','Po każdym przemieszczeniu ponownie sprawdź obecność.'].forEach(t=>add(bullet('☐ '+t)));
 add(h2('Wzór meldunku grupy — do wypełnienia podczas zdarzenia'));
 add(table(['Pole','Wpis'],[['Data i godzina','........................................'],['Klasa / grupa','........................................'],['Lokalizacja i miejsce schronienia','........................................'],['Liczba osób w grupie według wykazu','........................................'],['Obecni (uczniowie / opiekunowie)','........................................'],['Nieobecni / brakujące osoby — tylko kanałem wewnętrznym','........................................'],['Poszkodowani / wymagający wsparcia — w dokumentacji chronionej','........................................'],['Droga / problemy / potrzeby','........................................'],['Nazwisko lub funkcja meldunkującego','........................................'],['Odbiorca meldunku / godzina','........................................']]));
 add(pageBreak());add(h1('ZAŁĄCZNIK 8. Wzory komunikatów do rodziców i opiekunów'));
 add(h2('A. Informacja przed zagrożeniem'));
 add(pp(`Szanowni Państwo, placówka ${field('schoolName')} posiada procedurę postępowania po otrzymaniu informacji o zagrożeniu z powietrza. W przypadku ogłoszenia alarmu dzieci pozostają pod opieką pracowników w wcześniej wyznaczonych miejscach wewnątrz budynku. Prosimy o niewjeżdżanie na teren placówki i nieblokowanie dojazdu służbom. Informacje będziemy przekazywać kanałem: ${field('parentChannel')} (zapasowo: ${field('parentBackup')}).`));
 add(h2('B. Komunikat podczas alarmu — wymaga sprawdzenia i zatwierdzenia'));
 add(pp(`W związku z otrzymanym komunikatem o zagrożeniu placówka ${field('schoolName')} realizuje przygotowaną procedurę. Dzieci i uczniowie pozostają pod opieką personelu. Prosimy o nieprzyjeżdżanie po dzieci, nieblokowanie dróg dojazdowych i niekontaktowanie się bezpośrednio z nauczycielami sprawującymi opiekę. Kolejne potwierdzone informacje przekażemy tym samym kanałem. Nie publikujemy niepotwierdzonych informacji o zdarzeniu.`));
 add(h2('C. Komunikat po odwołaniu alarmu i potwierdzeniu warunków'));
 add(pp(`Alarm został odwołany zgodnie z urzędowym komunikatem. Po sprawdzeniu warunków organizacji odbioru placówka poinformuje Państwa o dalszym trybie zajęć i miejscu przekazania dzieci: ${field('pickupPoint')}. Dziecko otrzyma tylko osoba uprawniona po sprawdzeniu tożsamości. Prosimy o oczekiwanie na szczegółowe informacje, zamiast samodzielnego podejmowania prób odbioru.`));
 add(pp('Każdy komunikat należy dopasować do rzeczywistego stanu, zatwierdzić i przekazać zgodnie z zasadami placówki. Nie podawać publicznie szczegółów infrastruktury ani danych osobowych poszkodowanych.','Small'));
 add(pageBreak());add(h1('ZAŁĄCZNIK 9. Lista kontrolna dyrektora i plan korekt'));
 const directorList=[['Czy pisemne ustalenia i dokumentacja zostały uzyskane?',FORMAL.every(([k])=>!!f['formal_'+k])?'TAK':'NIE'],['Czy znane jest największe obłożenie placówki?',persons>0?'TAK':'NIE'],['Czy potwierdzona pojemność wewnętrzna odpowiada liczbie osób?',persons>0&&cap>=persons?'TAK, wg wprowadzonych danych':'NIE / BRAK POTWIERDZENIA'],['Czy każde miejsce ma ustaloną podstawę statusu i pojemności?',p.length>0&&p.every(z=>z.confirmed&&clean(z.basis)&&num(z.capacity)>0)?'TAK, wg deklaracji':'NIE'],['Czy wszystkie grupy mają przydział i drogi wewnętrzne?',g.length>0&&g.every(z=>z.placeId&&clean(z.route)&&!z.outside)?'TAK, wg deklaracji':'NIE'],['Czy wskazano zastępstwa wszystkich funkcji?',ROLE_DATA.every(([k])=>clean(role(k).person)&&clean(role(k).deputy))?'TAK':'NIE'],['Czy dostępne są alarmowanie i meldunki zastępcze?',clean(f.signalBackup)&&clean(f.reportBackup)?'TAK, wg deklaracji':'NIE'],['Czy uwzględniono pomoc osobom o szczególnych potrzebach?',f.specialNeeds!=='nie ustalono'&&(f.specialNeeds==='nie'||clean(f.supportPlan))?'TAK, wg deklaracji':'NIE'],['Czy poinformowano rodziców i ustalono odbiór?',clean(f.parentChannel)&&clean(f.pickupPoint)?'WPROWADZONO USTALENIA':'NIE'],['Czy plany kondygnacji są dołączone i sprawdzone?',clean(f.planRef)&&clean(f.plans)&&clean(f.planDate)?'WPROWADZONO DANE; DOŁĄCZYĆ RYSUNKI':'NIE'],['Czy przeprowadzono właściwe ćwiczenia?',f.drillStage==='ćwiczenie całej placówki'?'TAK, wg deklaracji':'NIE / W TOKU']];
 add(table(['Czynność kontrolna','Wynik (według wpisów, do zweryfikowania)'],directorList));
 add(h2('Raport wykrytych braków — zadania do uzupełnienia'));
 add(table(['Priorytet','Działanie naprawcze','Etap formularza','Odpowiedzialny / termin / status'],a.issues.map(z=>[z.level==='critical'?'PILNE / KRYTYCZNE':'DO UZUPEŁNIENIA',`${z.title}. ${z.detail}`,`${z.step+1}`, '........................................'])));
 add(pp(`Suma uwag: ${a.issues.length}, w tym krytycznych: ${a.critical}. Raport generowany na podstawie deklarowanych danych; nie jest opinią rzeczoznawcy ani audytem gotowości placówki. Jeżeli w raporcie nie ma uwag, nadal konieczna jest kontrola rzeczywista.`));
 add(pageBreak());add(h1('ZAŁĄCZNIK 10. Rejestr ćwiczeń i zdarzeń'));
 add(table(['Pole','Do uzupełnienia'],[['Rodzaj: szkolenie / ćwiczenie / zdarzenie','........................................................'],['Data, godzina rozpoczęcia i zakończenia','........................................................'],['Źródło alarmu / treść komunikatu','........................................................'],['Osoba kierująca / uczestniczące grupy','........................................................'],['Liczba obecnych, brakujących i poszkodowanych','........................................................'],['Czas przejścia poszczególnych grup','........................................................'],['Drogi zastępcze, zatory, awarie, problemy z łącznością','........................................................'],['Zastosowane komunikaty do rodziców','........................................................'],['Nieprawidłowości i wnioski','........................................................'],['Zadanie naprawcze / odpowiedzialny / termin','........................................................'],['Data sprawdzenia wykonania korekt','........................................................'],['Podpis i data zatwierdzenia rejestru','........................................................']]));
 add(h2('Metryka aktualizacji procedury'));
 add(table(['Wersja','Data','Powód zmiany','Zatwierdzający'],[[field('docVersion'),humanDate(f.approvalDate),'Pierwsze opracowanie / aktualizacja',field('director')],['','','',''],['','','','']]));
 add(h2('Źródła, autorstwo i zastrzeżenia'));
 add(pp('Podstawowe źródło merytoryczne: MEN, MSWiA, RCB, „Procedura przygotowania i reagowania w szkole lub przedszkolu po otrzymaniu komunikatu o zagrożeniu z powietrza, ogłoszeniu alarmu i jego odwołaniu”, materiał udostępniony 12.10.2026. https://www.gov.pl/web/edukacja/procedura-przygotowania-i-reagowania-po-otrzymaniu-komunikatu-o-zagrozeniu-z-powietrza'));
 add(pp('Informacja o narzędziu: generator opracował Marcin Pietkiewicz (BezpieczneDzieci.com). Narzędzie jest niezależne od MEN, MSWiA i RCB. Dokument należy zweryfikować, uzupełnić, uzgodnić i zatwierdzić. Wypełnienie formularza nie nadaje pomieszczeniom formalnego statusu ochronnego. Dane i ustalenia placówki pozostają odpowiedzialnością jednostki przygotowującej dokument.'));
 add(pp(`Data wygenerowania projektu: ${new Date().toLocaleDateString('pl-PL')}. Nie umieszczaj pełnej wersji z trasami i przydziałami w publicznie dostępnym serwisie. BezpieczneDzieci.com nie otrzymuje danych z formularza.`, 'Small'));
 const fullDoc=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><w:body>${lines.join('')}<w:sectPr><w:footerReference w:type="default" r:id="rId1"/><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1160" w:right="1050" w:bottom="1150" w:left="1050" w:header="600" w:footer="650"/></w:sectPr></w:body></w:document>`;
 const STYLES=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:cs="Arial"/><w:sz w:val="20"/><w:color w:val="23364C"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after="100" w:line="280" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults>
 <w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/></w:style>
 <w:style w:type="paragraph" w:styleId="Title"><w:name w:val="Title"/><w:pPr><w:spacing w:before="90" w:after="220"/></w:pPr><w:rPr><w:b/><w:sz w:val="38"/><w:color w:val="102A48"/></w:rPr></w:style>
 <w:style w:type="paragraph" w:styleId="Subtitle"><w:name w:val="Subtitle"/><w:pPr><w:spacing w:after="260"/></w:pPr><w:rPr><w:sz w:val="23"/><w:color w:val="007C7D"/></w:rPr></w:style>
 <w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"/><w:pPr><w:keepNext/><w:spacing w:before="340" w:after="180"/><w:outlineLvl w:val="0"/></w:pPr><w:rPr><w:b/><w:sz w:val="27"/><w:color w:val="102A48"/></w:rPr></w:style>
 <w:style w:type="paragraph" w:styleId="Heading2"><w:name w:val="heading 2"/><w:pPr><w:keepNext/><w:spacing w:before="220" w:after="130"/><w:outlineLvl w:val="1"/></w:pPr><w:rPr><w:b/><w:sz w:val="23"/><w:color w:val="006B6F"/></w:rPr></w:style>
 <w:style w:type="paragraph" w:styleId="Heading3"><w:name w:val="heading 3"/><w:pPr><w:keepNext/><w:spacing w:before="170" w:after="100"/></w:pPr><w:rPr><w:b/><w:sz w:val="21"/></w:rPr></w:style>
 <w:style w:type="paragraph" w:styleId="Kicker"><w:name w:val="Kicker"/><w:rPr><w:b/><w:sz w:val="16"/><w:color w:val="007C7D"/></w:rPr></w:style>
 <w:style w:type="paragraph" w:styleId="Small"><w:name w:val="Small"/><w:rPr><w:sz w:val="16"/><w:color w:val="617286"/></w:rPr></w:style>
 <w:style w:type="paragraph" w:styleId="Warning"><w:name w:val="Warning"/><w:pPr><w:spacing w:before="130" w:after="160"/></w:pPr><w:rPr><w:b/><w:sz w:val="18"/><w:color w:val="A1263F"/></w:rPr></w:style>
 <w:style w:type="paragraph" w:styleId="Bullet"><w:name w:val="Bullet"/><w:pPr><w:spacing w:after="60"/></w:pPr></w:style>
 <w:style w:type="paragraph" w:styleId="TableText"><w:name w:val="Table Text"/><w:pPr><w:spacing w:after="0"/></w:pPr><w:rPr><w:sz w:val="17"/></w:rPr></w:style>
 <w:style w:type="paragraph" w:styleId="TableHead"><w:name w:val="Table Heading"/><w:pPr><w:spacing w:after="0"/></w:pPr><w:rPr><w:b/><w:sz w:val="17"/><w:color w:val="102A48"/></w:rPr></w:style></w:styles>`;
 const FOOTER=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:ftr xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:color w:val="6B7B8F"/><w:sz w:val="16"/></w:rPr><w:t>PROJEKT DO WERYFIKACJI • Strona </w:t></w:r><w:fldSimple w:instr="PAGE"/></w:p></w:ftr>`;
 const contentTypes=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/><Override PartName="/word/footer1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml"/><Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/></Types>`;
 const rels=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/></Relationships>`;
 const wordRels=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer" Target="footer1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`;
 const core=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/"><dc:title>Procedura reagowania na zagrożenie z powietrza — ${X(f.schoolName||'projekt')}</dc:title><dc:creator>Generator procedury — opracowanie na potrzeby placówki</dc:creator><dc:description>Projekt procedury do uzupełnienia i zatwierdzenia przez placówkę.</dc:description></cp:coreProperties>`;
 return zipStored({'[Content_Types].xml':contentTypes,'_rels/.rels':rels,'docProps/core.xml':core,'word/document.xml':fullDoc,'word/styles.xml':STYLES,'word/footer1.xml':FOOTER,'word/_rels/document.xml.rels':wordRels});
}
// Pełny zapis ZIP w trybie STORE (bez kompresji): interoperacyjny plik OOXML, także offline.
const enc=new TextEncoder();
const CRC_TABLE=(()=>{const t=[];for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=c&1?0xEDB88320^(c>>>1):c>>>1;t[n]=c>>>0;}return t;})();
function crc32(bytes){let c=0xffffffff;for(const b of bytes)c=CRC_TABLE[(c^b)&255]^(c>>>8);return (c^0xffffffff)>>>0;}
function zipStored(entries){const locals=[],centers=[];let off=0,count=0;const te=enc;let size=0;
 for(const [path,value] of Object.entries(entries)){const filename=te.encode(path),data=typeof value==='string'?te.encode(value):value,crc=crc32(data),l=new Uint8Array(30+filename.length+data.length),dv=new DataView(l.buffer);dv.setUint32(0,0x04034b50,true);dv.setUint16(4,20,true);dv.setUint16(6,0x0800,true);dv.setUint16(8,0,true);dv.setUint32(14,crc,true);dv.setUint32(18,data.length,true);dv.setUint32(22,data.length,true);dv.setUint16(26,filename.length,true);l.set(filename,30);l.set(data,30+filename.length);locals.push(l);
 const c=new Uint8Array(46+filename.length),cd=new DataView(c.buffer);cd.setUint32(0,0x02014b50,true);cd.setUint16(4,20,true);cd.setUint16(6,20,true);cd.setUint16(8,0x0800,true);cd.setUint16(10,0,true);cd.setUint32(16,crc,true);cd.setUint32(20,data.length,true);cd.setUint32(24,data.length,true);cd.setUint16(28,filename.length,true);cd.setUint32(42,off,true);c.set(filename,46);centers.push(c);off+=l.length;size+=c.length;count++;
 }const end=new Uint8Array(22),ed=new DataView(end.buffer);ed.setUint32(0,0x06054b50,true);ed.setUint16(8,count,true);ed.setUint16(10,count,true);ed.setUint32(12,size,true);ed.setUint32(16,off,true);const out=new Uint8Array(off+size+end.length);let ptr=0;for(const a of [...locals,...centers,end]){out.set(a,ptr);ptr+=a.length;}return out;}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initialize);else initialize();
