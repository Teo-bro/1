// 전역 변수
    const bibleData = {}; 
    let currentBook = null; 
    let currentChapter = null; 
    let currentVerse = null; 
    let displayMode = "standard"; 

    // 실행 취소(Undo) / 앞으로 가기(Redo) 스택
    let historyStack = []; 
    let redoStack = [];    
    let isRestoring = false; 
    
    // 성경 책 정보
    const bibleBooks = [
        { name: "창세기", abbr: "창", chapters: 50, testament: "old" },
        { name: "출애굽기", abbr: "출", chapters: 40, testament: "old" },
        { name: "레위기", abbr: "레", chapters: 27, testament: "old" },
        { name: "민수기", abbr: "민", chapters: 36, testament: "old" },
        { name: "신명기", abbr: "신", chapters: 34, testament: "old" },
        { name: "여호수아", abbr: "수", chapters: 24, testament: "old" },
        { name: "재판관기", abbr: "판", chapters: 21, testament: "old" },
        { name: "룻기", abbr: "룻", chapters: 4, testament: "old" },
        { name: "사무엘상", abbr: "삼상", chapters: 31, testament: "old" },
        { name: "사무엘하", abbr: "삼하", chapters: 24, testament: "old" },
        { name: "열왕기상", abbr: "왕상", chapters: 22, testament: "old" },
        { name: "열왕기하", abbr: "왕하", chapters: 25, testament: "old" },
        { name: "역대기상", abbr: "대상", chapters: 29, testament: "old" },
        { name: "역대기하", abbr: "대하", chapters: 36, testament: "old" },
        { name: "에스라", abbr: "스", chapters: 10, testament: "old" },
        { name: "느헤미야", abbr: "느", chapters: 13, testament: "old" },
        { name: "에스더", abbr: "에", chapters: 10, testament: "old" },
        { name: "욥기", abbr: "욥", chapters: 42, testament: "old" },
        { name: "시편", abbr: "시", chapters: 150, testament: "old" },
        { name: "잠언", abbr: "잠", chapters: 31, testament: "old" },
        { name: "전도서", abbr: "전", chapters: 12, testament: "old" },
        { name: "솔로몬의 노래", abbr: "솔", chapters: 8, testament: "old" },
        { name: "이사야", abbr: "사", chapters: 66, testament: "old" },
        { name: "예레미야", abbr: "렘", chapters: 52, testament: "old" },
        { name: "예레미야 애가", abbr: "애", chapters: 5, testament: "old" },
        { name: "에스겔", abbr: "겔", chapters: 48, testament: "old" },
        { name: "다니엘", abbr: "단", chapters: 12, testament: "old" },
        { name: "호세아", abbr: "호", chapters: 14, testament: "old" },
        { name: "요엘", abbr: "욜", chapters: 3, testament: "old" },
        { name: "아모스", abbr: "암", chapters: 9, testament: "old" },
        { name: "오바댜", abbr: "옵", chapters: 1, testament: "old" },
        { name: "요나", abbr: "욘", chapters: 4, testament: "old" },
        { name: "미카", abbr: "미", chapters: 7, testament: "old" },
        { name: "나훔", abbr: "나", chapters: 3, testament: "old" },
        { name: "하박국", abbr: "합", chapters: 3, testament: "old" },
        { name: "스파냐", abbr: "슾", chapters: 3, testament: "old" },
        { name: "학개", abbr: "학", chapters: 2, testament: "old" },
        { name: "스카랴", abbr: "슼", chapters: 14, testament: "old" },
        { name: "말라키", abbr: "말", chapters: 4, testament: "old" },
        { name: "마태복음", abbr: "마", chapters: 28, testament: "new" },
        { name: "마가복음", abbr: "막", chapters: 16, testament: "new" },
        { name: "누가복음", abbr: "눅", chapters: 24, testament: "new" },
        { name: "요한복음", abbr: "요", chapters: 21, testament: "new" },
        { name: "사도행전", abbr: "행", chapters: 28, testament: "new" },
        { name: "로마서", abbr: "롬", chapters: 16, testament: "new" },
        { name: "고린도전서", abbr: "고전", chapters: 16, testament: "new" },
        { name: "고린도후서", abbr: "고후", chapters: 13, testament: "new" },
        { name: "갈라디아서", abbr: "갈", chapters: 6, testament: "new" },
        { name: "에베소서", abbr: "엡", chapters: 6, testament: "new" },
        { name: "빌립보서", abbr: "빌", chapters: 4, testament: "new" },
        { name: "골로새서", abbr: "골", chapters: 4, testament: "new" },
        { name: "데살로니가전서", abbr: "살전", chapters: 5, testament: "new" },
        { name: "데살로니가후서", abbr: "살후", chapters: 3, testament: "new" },
        { name: "디모데전서", abbr: "딤전", chapters: 6, testament: "new" },
        { name: "디모데후서", abbr: "딤후", chapters: 4, testament: "new" },
        { name: "디도서", abbr: "딛", chapters: 3, testament: "new" },
        { name: "빌레몬서", abbr: "몬", chapters: 1, testament: "new" },
        { name: "히브리서", abbr: "히", chapters: 13, testament: "new" },
        { name: "야고보서", abbr: "약", chapters: 5, testament: "new" },
        { name: "베드로전서", abbr: "벧전", chapters: 5, testament: "new" },
        { name: "베드로후서", abbr: "벧후", chapters: 3, testament: "new" },
        { name: "요한일서", abbr: "요일", chapters: 5, testament: "new" },
        { name: "요한이서", abbr: "요이", chapters: 1, testament: "new" },
        { name: "요한삼서", abbr: "요삼", chapters: 1, testament: "new" },
        { name: "유다서", abbr: "유", chapters: 1, testament: "new" },
        { name: "요한계시록", abbr: "계", chapters: 22, testament: "new" }
    ];

    const abbrToName = {};
    bibleBooks.forEach(book => abbrToName[book.abbr] = book.name);

    const nameToAbbr = {};
    bibleBooks.forEach(book => nameToAbbr[book.name] = book.abbr);

    const bookToChapters = {};
    bibleBooks.forEach(book => {
        bookToChapters[book.name] = book.chapters;
        bookToChapters[book.abbr] = book.chapters;
    });

    // 페이지 로드 시 초기화
    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('output').innerHTML = '<p>성경 데이터를 불러오는 중입니다...</p>';

        fetch('bible_data.json')
            .then(response => {
                if (!response.ok) throw new Error('네트워크 응답이 좋지 않습니다.');
                return response.json();
            })
            .then(data => {
                data.forEach(item => {
                    const book = item.book;
                    const chapter = item.chapter;
                    const verse = item.verse;
                    const text = item.text;

                    if (!bibleData[book]) bibleData[book] = {};
                    if (!bibleData[book][chapter]) bibleData[book][chapter] = {};
                    
                    bibleData[book][chapter][verse] = text;
                });

                document.getElementById('output').innerHTML = ''; 
                createBookButtons();
                setupEventListeners();
                loadInitialData();
            })
            .catch(error => {
                console.error('성경 데이터를 불러오는데 실패했습니다:', error);
                document.getElementById('output').innerHTML = '<p class="error">데이터를 불러오지 못했습니다. 파일 위치나 서버 상태를 확인해주세요.</p>';
            });
    });

    function createBookButtons() {
        const sidebar = document.getElementById('sidebar');
        let currentTestament = null;
        
        for (let i = 0; i < bibleBooks.length; i += 3) {
            if (currentTestament === "old" && bibleBooks[i].testament === "new") {
                const testamentGap = document.createElement('div');
                testamentGap.className = 'new-testament-gap';
                sidebar.appendChild(testamentGap);
            }
            currentTestament = bibleBooks[i].testament;
            
            const booksRow = document.createElement('div');
            booksRow.className = 'books-row';
            
            for (let j = 0; j < 3 && i + j < bibleBooks.length; j++) {
                const book = bibleBooks[i + j];
                const button = document.createElement('button');
                button.className = `book-button ${book.testament}`;
                button.textContent = book.abbr;
                button.setAttribute('data-book', book.name);
                button.addEventListener('click', () => selectBook(book.name));
                booksRow.appendChild(button);
            }
            
            sidebar.appendChild(booksRow);
        }
    }

    // 책 선택
    function selectBook(bookName, skipSave = false, targetChapter = 1) {
        if (!skipSave) saveState();
        currentBook = bookName;
        currentChapter = targetChapter; 
        currentVerse = null;
        
        document.querySelectorAll('.book-button').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const selectedBtn = document.querySelector(`.book-button[data-book="${bookName}"]`);
        if (selectedBtn) {
            selectedBtn.classList.add('active');
        }
        
        document.querySelectorAll('.chapter-container').forEach(container => {
            container.remove();
        });
        
        createChapterButtons(bookName);
        
        displayChapter(bookName, targetChapter);
        
        const chapterButtons = document.querySelectorAll('.chapter-button');
        if (chapterButtons.length > 0 && chapterButtons[targetChapter - 1]) {
            chapterButtons[targetChapter - 1].classList.add('active');
        }
        
        document.getElementById('navigation-buttons').classList.remove('hidden');
    }

    function createChapterButtons(bookName) {
        const bookButton = document.querySelector(`.book-button[data-book="${bookName}"]`);
        if (!bookButton) return;
        
        const booksRow = bookButton.parentElement;
        const chapterContainer = document.createElement('div');
        chapterContainer.className = 'chapter-container';
        
        const numChapters = bookToChapters[bookName];
        for (let i = 1; i <= numChapters; i++) {
            const button = document.createElement('button');
            button.className = 'chapter-button';
            button.textContent = i;
            button.setAttribute('data-chapter', i);
            button.addEventListener('click', () => {
                selectChapter(i);
            });
            chapterContainer.appendChild(button);
        }
        
        booksRow.parentElement.insertBefore(chapterContainer, booksRow.nextSibling);
    }

    // 장 선택
    function selectChapter(chapter, skipSave = false) {
        if (!skipSave) saveState();
        currentChapter = chapter;
        
        document.querySelectorAll('.chapter-button').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const selectedChapterBtn = document.querySelector(`.chapter-button[data-chapter="${chapter}"]`);
        if (selectedChapterBtn) {
            selectedChapterBtn.classList.add('active');
        }
        
        displayChapter(currentBook, chapter);
    }

    // 장 표시 함수 
    function displayChapter(bookName, chapter, highlightVerses = []) {
        if (!bibleData[bookName] || !bibleData[bookName][chapter]) {
            document.getElementById('output').innerHTML = `<p class="error">${bookName} ${chapter}장 데이터가 없습니다.</p>`;
            return;
        }
        
        const verses = bibleData[bookName][chapter];
        let output = `<h2 class="chapter-title">${bookName} ${chapter}${bookName==="시편"?"편":"장"}</h2>`;
        
        const verseNums = Object.keys(verses).map(Number).sort((a, b) => a - b);
        for (const verseNum of verseNums) {
            const verseText = verses[verseNum];
            const isHighlighted = highlightVerses.includes(verseNum);
            const verseNumClass = isHighlighted ? 'verse-number verse-highlight' : 'verse-number';
            
            output += `<p><span class="${verseNumClass}" style="cursor: pointer;" onclick="executeSearch('${bookName} ${chapter}:${verseNum}')" title="${bookName} ${chapter}:${verseNum} 출력 모드로 보기">${verseNum}</span> ${verseText}</p>`;
        }
        
        document.getElementById('output').innerHTML = output;
        
        const container = document.querySelector('.output-container');
        if (highlightVerses.length > 0) {
            const firstHighlight = document.querySelector('.verse-highlight');
            if (firstHighlight) {
                const offset = firstHighlight.offsetTop - (container.clientHeight / 2);
                container.scrollTop = offset > 0 ? offset : 0;
            }
        } else {
            container.scrollTop = 0;
        }
    }

    // 단어 검색 함수
    function searchWord(word) {
        if (!word.trim()) {
            document.getElementById('output').innerHTML = `<p class="error">검색할 단어를 입력해주세요.</p>`;
            return;
        }
        
        saveState();
        let results = [];
        let totalOccurrences = 0;
        
        for (const book in bibleData) {
            for (const chapter in bibleData[book]) {
                for (const verse in bibleData[book][chapter]) {
                    const text = bibleData[book][chapter][verse];
                    const regex = new RegExp(word, 'gi');
                    const matches = text.match(regex);
                    
                    if (matches) {
                        totalOccurrences += matches.length;
                        results.push({
                            book,
                            chapter: parseInt(chapter),
                            verse: parseInt(verse),
                            text
                        });
                    }
                }
            }
        }
        
        displaySearchResults(results, word, totalOccurrences);
    }

    // 검색 결과 표시 함수
    function displaySearchResults(results, searchWord, totalOccurrences) {
        const outputDiv = document.getElementById('output');
        
        if (results.length === 0) {
            outputDiv.innerHTML = `<p class="error">'${searchWord}'에 대한 검색 결과가 없습니다.</p>`;
            return;
        }
        
        let output = `<p style="font-size: 1.2em; font-weight: bold;">'${searchWord}'이(가) ${results.length}개의 구절에서 총 ${totalOccurrences}번 등장합니다.</p>`;
        
        results.forEach(result => {
            const { book, chapter, verse, text } = result;
            const highlightedText = text.replace(new RegExp(searchWord, 'gi'), match => `<span class="highlight">${match}</span>`);
            
            switch (displayMode) {
                case 'standard':
                    output += `<p><span class="reference" data-book="${book}" data-chapter="${chapter}" data-verse="${verse}" data-verses="${verse}">${book} ${chapter}:${verse}</span><br>${highlightedText}</p>`;
                    break;
                case 'abbr':
                    const abbr = nameToAbbr[book] || book;
                    output += `<p><span class="reference" data-book="${book}" data-chapter="${chapter}" data-verse="${verse}" data-verses="${verse}">${abbr} ${chapter}:${verse}</span> ${highlightedText}</p>`;
                    break;
                case 'quote':
                    output += `<p>「${highlightedText}」<br><span class="reference" data-book="${book}" data-chapter="${chapter}" data-verse="${verse}" data-verses="${verse}">(${book} ${chapter}:${verse})</span></p>`;
                    break;
                case 'short-quote': {
                    const abbrQuote = nameToAbbr[book] || book;
                    output += `<p>「${highlightedText}」<span class="reference" data-book="${book}" data-chapter="${chapter}" data-verse="${verse}" data-verses="${verse}">(${abbrQuote} ${chapter}:${verse})</span></p>`;
                    break; }
                case 'double-quote':
                    output += `<p>『${highlightedText}』<br><span class="reference" data-book="${book}" data-chapter="${chapter}" data-verse="${verse}" data-verses="${verse}">(${book} ${chapter}:${verse})</span></p>`;
                    break;
                case 'double-short-quote':
                    const abbrQuote2 = nameToAbbr[book] || book;
                    output += `<p>『${highlightedText}』<span class="reference" data-book="${book}" data-chapter="${chapter}" data-verse="${verse}" data-verses="${verse}">(${abbrQuote2} ${chapter}:${verse})</span></p>`;
                    break;
            }
        });
        
        outputDiv.innerHTML = output;
        
        // 스크롤 맨 위로 올리기
        document.querySelector('.output-container').scrollTop = 0; 
        // 클릭 이벤트 한 번만 달기
        addReferenceClickEvents();
    }

    function addReferenceClickEvents() {
        document.querySelectorAll('.reference').forEach(ref => {
            ref.addEventListener('click', function() {
                const book = this.getAttribute('data-book');
                const chapter = parseInt(this.getAttribute('data-chapter'));
                const versesAttr = this.getAttribute('data-verses');
                const verses = versesAttr ? versesAttr.split(',').map(v => parseInt(v)) : [];
                
                saveState();
                currentBook = book;
                currentChapter = chapter;
                currentVerse = verses.length > 0 ? verses[0] : null;
                
                const bookBtn = document.querySelector(`.book-button[data-book="${book}"]`);
                if (bookBtn) {
                    bookBtn.click();
                    
                    setTimeout(() => {
                        const chapBtn = document.querySelector(`.chapter-button[data-chapter="${chapter}"]`);
                        if (chapBtn) {
                            chapBtn.click();  
                        }
                        displayChapter(book, chapter, verses);
                    }, 0);
                } else {
                    displayChapter(book, chapter, verses);
                }
            });
        });
    }

    function parseReferenceAndSearch(rawQuery) {
        saveState();
        let query = rawQuery;
        bibleBooks.forEach(book => {
            if (book.name.includes(' ')) {
                const squashed = book.name.replace(/\s+/g, '');
                query = query.replace(new RegExp(squashed, 'gi'), book.name);
            }
        });
        query = query.replace(/([\uAC00-\uD7A3])(?=\d)/g, '$1 ');

        if (!query.trim()) return document.getElementById('output').innerHTML = '<p class="error">검색어를 입력해주세요.</p>';

        const validBooks = new Set([...bibleBooks.map(b => b.name), ...bibleBooks.map(b => b.abbr)]);
        const rawTokens = query.trim().split(/\s+/);
        const tokens = [];

        for (let i = 0; i < rawTokens.length;) {
            if (i + 2 < rawTokens.length) {
                const twoWordBook = rawTokens[i] + ' ' + rawTokens[i+1];
                if (validBooks.has(twoWordBook)) {
                    tokens.push(twoWordBook + ' ' + rawTokens[i+2]);
                    i += 3;
                    continue;
                }
            }
            if (validBooks.has(rawTokens[i]) && rawTokens[i+1]) {
                tokens.push(rawTokens[i] + ' ' + rawTokens[i+1]);
                i += 2;
            } else {
                tokens.push(rawTokens[i]);
                i += 1;
            }
        }

        const allGroups = [];
        function clean(str) {
            return str.replace(/\s+/g, '').normalize('NFC');
        }

        for (const token of tokens) {
            const match = token.match(/^([^\d]+)\s*(\d+)[:.]([\d,-]+)$/);
            if (!match) return searchWord(rawQuery); 

            let [_, bookRaw, chapter, versePart] = match;
            const bookObj = bibleBooks.find(b => clean(b.name) === clean(bookRaw) || clean(b.abbr) === clean(bookRaw));
            if (!bookObj) return document.getElementById('output').innerHTML = `<p class="error">잘못된 책 이름: ${bookRaw}</p>`;
            const book = bibleData[bookObj.abbr] ? bookObj.abbr : bookObj.name;
            const chapterData = bibleData[book]?.[chapter];
            if (!chapterData) return document.getElementById('output').innerHTML = `<p class="error">존재하지 않는 장: ${bookRaw} ${chapter}</p>`;

            const verses = [];
            const parts = versePart.split(',');
            for (const part of parts) {
                if (part.includes('-')) {
                    const [start, end] = part.split('-').map(Number);
                    if (start > end) return document.getElementById('output').innerHTML = `<p class="error">절 순서 오류: ${part}</p>`;
                    for (let v = start; v <= end; v++) {
                        if (!chapterData[v]) return document.getElementById('output').innerHTML = `<p class="error">존재하지 않는 절: ${bookRaw} ${chapter}:${v}</p>`;
                        verses.push({ book, chapter, verse: v, text: chapterData[v] });
                    }
                } else {
                    const v = Number(part);
                    if (!chapterData[v]) return document.getElementById('output').innerHTML = `<p class="error">존재하지 않는 절: ${bookRaw} ${chapter}:${v}</p>`;
                    verses.push({ book, chapter, verse: v, text: chapterData[v] });
                }
            }

            const verseNumbers = verses.map(v => v.verse);
            const dupCheck = new Set(verseNumbers);
            if (dupCheck.size !== verseNumbers.length) {
                return document.getElementById('output').innerHTML = `<p class="error">중복된 절 포함: ${token}</p>`;
            }
            if (verseNumbers.some((v, i) => i > 0 && v <= verseNumbers[i-1])) {
                return document.getElementById('output').innerHTML = `<p class="error">절 순서 오류: ${token}</p>`;
            }

            allGroups.push({ book, chapter: parseInt(chapter), verses });
        }

        const allVerses = allGroups.flatMap(g => g.verses);
        displayVerseResults(allVerses, allGroups);
    }

    function displayVerseResults(verses, verseGroups = null) {
        if (!verses || verses.length === 0) {
            document.getElementById('output').innerHTML = '<p class="error">검색 결과가 없습니다.</p>';
            return;
        }

        let output = "";

        if (verseGroups) {
            verseGroups.forEach((group, groupIndex) => {
                const { book, chapter, verses: groupVerses } = group;
                if (groupVerses.length === 0) return;

                const verseNums = groupVerses.map(v => v.verse).sort((a, b) => a - b);
                let verseRef = '';
                let ranges = [], currentRange = [verseNums[0]];

                for (let i = 1; i < verseNums.length; i++) {
                    if (verseNums[i] === verseNums[i-1] + 1) {
                        currentRange.push(verseNums[i]);
                    } else {
                        ranges.push(currentRange);
                        currentRange = [verseNums[i]];
                    }
                }
                ranges.push(currentRange);

                verseRef = ranges.map(range => range.length === 1 ? range[0] : `${range[0]}-${range[range.length - 1]}`).join(',');
                const combinedText = groupVerses.sort((a, b) => a.verse - b.verse).map(v => v.text).join(' ');

                switch (displayMode) {
                    case 'standard':
                        output += `<p><span class="reference" data-book="${book}" data-chapter="${chapter}" data-verses="${verseNums.join(',')}">${book} ${chapter}:${verseRef}</span><br>${combinedText}</p>`;
                        break;
                    case 'abbr':
                        const abbr = nameToAbbr[book] || book;
                        output += `<p><span class="reference" data-book="${book}" data-chapter="${chapter}" data-verses="${verseNums.join(',')}">${abbr} ${chapter}:${verseRef}</span> ${combinedText}</p>`;
                        break;
                    case 'quote':
                        output += `<p>「${combinedText}」<br><span class="reference" data-book="${book}" data-chapter="${chapter}" data-verses="${verseNums.join(',')}">(${book} ${chapter}:${verseRef})</span></p>`;
                        break;
                    case 'short-quote': {
                        const abbrQuote = nameToAbbr[book] || book;
                        output += `<p>「${combinedText}」<span class="reference" data-book="${book}" data-chapter="${chapter}" data-verses="${verseNums.join(',')}">(${abbrQuote} ${chapter}:${verseRef})</span></p>`;
                        break; }
                    case 'double-quote':
                        output += `<p>『${combinedText}』<br><span class="reference" data-book="${book}" data-chapter="${chapter}" data-verses="${verseNums.join(',')}">(${book} ${chapter}:${verseRef})</span></p>`;
                        break;
                    case 'double-short-quote': {
                        const abbrQuote = nameToAbbr[book] || book;
                        output += `<p>『${combinedText}』<span class="reference" data-book="${book}" data-chapter="${chapter}" data-verses="${verseNums.join(',')}">(${abbrQuote} ${chapter}:${verseRef})</span></p>`;
                        break; }
                }

                if (verseGroups.length > 1 && groupIndex < verseGroups.length - 1) {
                    output += '<div style="margin: 10px 0;"></div>';
                }
            });

        } else {
            verses.forEach(verse => {
                const { book, chapter, verse: verseNum, text } = verse;

                switch (displayMode) {
                    case 'standard':
                        output += `<p><span class="reference" data-book="${book}" data-chapter="${chapter}" data-verse="${verseNum}" data-verses="${verseNum}">${book} ${chapter}:${verseNum}</span><br>${text}</p>`;
                        break;
                    case 'abbr':
                        const abbr = nameToAbbr[book] || book;
                        output += `<p><span class="reference" data-book="${book}" data-chapter="${chapter}" data-verse="${verseNum}" data-verses="${verseNum}">${abbr} ${chapter}:${verseNum}</span> ${text}</p>`;
                        break;
                    case 'quote':
                        output += `<p>「${text}」<br><span class="reference" data-book="${book}" data-chapter="${chapter}" data-verse="${verseNum}" data-verses="${verseNum}">(${book} ${chapter}:${verseNum})</span></p>`;
                        break;
                    case 'short-quote': {
                        const abbrQuote = nameToAbbr[book] || book; 
                        output += `<p>「${text}」<span class="reference" data-book="${book}" data-chapter="${chapter}" data-verse="${verseNum}" data-verses="${verseNum}">(${abbrQuote} ${chapter}:${verseNum})</span></p>`;
                        break; }
                    case 'double-quote':
                        output += `<p>『${text}』<br><span class="reference" data-book="${book}" data-chapter="${chapter}" data-verse="${verseNum}" data-verses="${verseNum}">(${book} ${chapter}:${verseNum})</span></p>`;
                        break;
                    case 'double-short-quote': {
                        const abbrQuote = nameToAbbr[book] || book; 
                        output += `<p>『${text}』<span class="reference" data-book="${book}" data-chapter="${chapter}" data-verse="${verseNum}" data-verses="${verseNum}">(${abbrQuote} ${chapter}:${verseNum})</span></p>`;
                        break; }
                }
            });
        }

        document.getElementById('output').innerHTML = output;
        
        // 스크롤 맨 위로 올리기
        document.querySelector('.output-container').scrollTop = 0; 
        // 클릭 이벤트 한 번만 달기
        addReferenceClickEvents();
    }

    function executeSearch(query) {
        document.getElementById('search-input').value = query;
        bibleBooks.forEach(book => {
        if (book.name.includes(' ')) {
            const squashed = book.name.replace(/\s+/g, '');
            query = query.replace(new RegExp(squashed, 'gi'), book.name);
            }
        });
        query = query.replace(/([\uAC00-\uD7A3])(?=\d)/g, '$1 ');

        if (!query.trim()) {
            document.getElementById('output').innerHTML = `<p class="error">검색할 단어나 구절을 입력해주세요.</p>`;
            return;
        }
        
        document.getElementById('navigation-buttons').classList.add('hidden');
        
        let isVerseReference = false;
        
        const allBookPatterns = bibleBooks
            .map(b => b.name)
            .concat(bibleBooks.map(b => b.abbr))
            .sort((a, b) => b.length - a.length);
        
        for (const bookPattern of allBookPatterns) {
            const bookRegex = new RegExp(`^${bookPattern}\\s*`, 'i');
            if (bookRegex.test(query)) {
                const rest = query.replace(bookRegex, '').trim();
                if (/^\d+\s*[:\.]\s*\d+/.test(rest)) {
                    isVerseReference = true;
                    break;
                }
            }
        }
        
        if (isVerseReference) {
            parseReferenceAndSearch(query);
        } else {
            searchWord(query);
        }
    }

    function setupEventListeners() {
        document.getElementById('search-button').addEventListener('click', () => {
            const query = document.getElementById('search-input').value.trim();
            executeSearch(query);
            
            document.querySelectorAll('.book-button.active, .chapter-button.active').forEach(btn => {
                btn.classList.remove('active');
            });
            
            document.querySelectorAll('.chapter-container').forEach(container => {
                container.remove();
            });
        });
        
        document.getElementById('search-input').addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                document.getElementById('search-button').click();
            }
        });
        
        document.getElementById('copy-button').addEventListener('click', () => {
            const output = document.getElementById('output');
            const contentToCopy = prepareContentForCopy(output);
            
            navigator.clipboard.writeText(contentToCopy)
                .then(() => {})
                .catch(err => {
                    const tempTextArea = document.createElement('textarea');
                    tempTextArea.value = contentToCopy;
                    document.body.appendChild(tempTextArea);
                    tempTextArea.select();
                    
                    try {
                        document.execCommand('copy');
                        alert('내용이 클립보드에 복사되었습니다.');
                    } catch (err) {
                        alert('복사에 실패했습니다.');
                    }
                    document.body.removeChild(tempTextArea);
                });
        });
        
        document.getElementById('prev-chapter').addEventListener('click', () => {
            if (!currentBook || !currentChapter) return;
            saveState();
            if (currentChapter > 1) {
                selectChapter(currentChapter - 1, true);
            } else {
                const currentBookIndex = bibleBooks.findIndex(b => b.name === currentBook);
                if (currentBookIndex > 0) {
                    const prevBook = bibleBooks[currentBookIndex - 1];
                    selectBook(prevBook.name, true, prevBook.chapters);
                }
            }
        });
        
        document.getElementById('next-chapter').addEventListener('click', () => {
            if (!currentBook || !currentChapter) return;
            saveState();
            const maxChapter = bookToChapters[currentBook];
            if (currentChapter < maxChapter) {
                selectChapter(currentChapter + 1, true);
            } else {
                const currentBookIndex = bibleBooks.findIndex(b => b.name === currentBook);
                if (currentBookIndex < bibleBooks.length - 1) {
                    const nextBook = bibleBooks[currentBookIndex + 1];
                    selectBook(nextBook.name, true);
                }
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (document.activeElement === document.getElementById('search-input')) return;
            if (e.key === 'ArrowLeft') {
                const prevButton = document.getElementById('prev-chapter');
                if (!prevButton.classList.contains('hidden')) prevButton.click();
            } else if (e.key === 'ArrowRight') {
                const nextButton = document.getElementById('next-chapter');
                if (!nextButton.classList.contains('hidden')) nextButton.click();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key.toLowerCase() === 'z') {
                e.preventDefault();
                undoAction();
            } else if (e.ctrlKey && e.key.toLowerCase() === 'y') {
                e.preventDefault();
                redoAction();
            }
        });

        document.getElementById('standard-format').addEventListener('click', () => changeDisplayMode('standard'));
        document.getElementById('abbr-format').addEventListener('click', () => changeDisplayMode('abbr'));
        document.getElementById('quote-format').addEventListener('click', () => changeDisplayMode('quote'));
        document.getElementById('short-quote-format').addEventListener('click', () => changeDisplayMode('short-quote'));
        document.getElementById('double-quote-format').addEventListener('click', () => changeDisplayMode('double-quote'));
        document.getElementById('double-short-quote-format').addEventListener('click', () => changeDisplayMode('double-short-quote'));
    }

    function saveState() {
        if (isRestoring) return;
        historyStack.push({
            book: currentBook,
            chapter: currentChapter,
            verse: currentVerse,
            displayMode: displayMode,
            query: document.getElementById('search-input').value,
            output: document.getElementById('output').innerHTML
        });
        redoStack = []; 
        if (historyStack.length > 50) historyStack.shift();
    }

    function undoAction() {
        if (historyStack.length === 0) return;
        isRestoring = true;
        redoStack.push({
            book: currentBook,
            chapter: currentChapter,
            verse: currentVerse,
            displayMode: displayMode,
            query: document.getElementById('search-input').value,
            output: document.getElementById('output').innerHTML
        });
        const prevState = historyStack.pop();
        restoreState(prevState);
        isRestoring = false;
    }

    function redoAction() {
        if (redoStack.length === 0) return;
        isRestoring = true;
        historyStack.push({
            book: currentBook,
            chapter: currentChapter,
            verse: currentVerse,
            displayMode: displayMode,
            query: document.getElementById('search-input').value,
            output: document.getElementById('output').innerHTML
        });
        const nextState = redoStack.pop();
        restoreState(nextState);
        isRestoring = false;
    }

    function restoreState(state) {
        currentBook = state.book;
        currentChapter = state.chapter;
        currentVerse = state.verse;
        displayMode = state.displayMode;

        document.getElementById('search-input').value = state.query;
        document.getElementById('output').innerHTML = state.output;

        document.querySelectorAll('.format-button').forEach(btn => btn.classList.remove('active'));
        const activeFormatBtn = document.getElementById(`${displayMode}-format`);
        if (activeFormatBtn) activeFormatBtn.classList.add('active');

        document.querySelectorAll('.book-button').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-book') === currentBook) {
                btn.classList.add('active');
            }
        });

        document.querySelectorAll('.chapter-container').forEach(c => c.remove());

        if (currentBook) {
            createChapterButtons(currentBook);
            if (currentChapter) {
                document.querySelectorAll('.chapter-button').forEach(btn => {
                    if (parseInt(btn.getAttribute('data-chapter')) === currentChapter) {
                        btn.classList.add('active');
                    }
                });
            }
            document.getElementById('navigation-buttons').classList.remove('hidden');
        } else {
            document.getElementById('navigation-buttons').classList.add('hidden');
        }

        addReferenceClickEvents();
    }

    function prepareContentForCopy(outputElement) {
        const mode = displayMode;
        const clone = outputElement.cloneNode(true);
        clone.querySelectorAll('br').forEach(br => {
            const newline = document.createTextNode('\n');
            br.parentNode.replaceChild(newline, br);
        });
        
        const firstP = clone.querySelector('p');
        if (firstP && firstP.textContent.includes('구절에서 총') && firstP.textContent.includes('등장')) {
            firstP.remove();
        }
        
        const highlights = clone.querySelectorAll('.highlight');
        highlights.forEach(h => h.outerHTML = h.textContent);
        
        const headings = clone.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headings.forEach(h => h.outerHTML = h.textContent + '\n');
        
        const paras = Array.from(clone.querySelectorAll('p'));
        if (paras.length > 0) {
            return paras.map(p => p.innerText.trim()).join('\n\n').trim();
        }
        return clone.innerText.trim();
    }
    
    function changeFont(fontType) {
        const outputContainer = document.querySelector('.output-container');
        outputContainer.classList.remove('font-malgun', 'font-batang', 'font-gmarket');
        outputContainer.classList.add(`font-${fontType}`);
        
        document.querySelectorAll('.font-button').forEach(btn => {
            btn.classList.remove('active');
        });
        document.getElementById(`font-${fontType}`).classList.add('active');
    }
    
    function changeDisplayMode(mode) {
        displayMode = mode;
        document.querySelectorAll('.format-button').forEach(btn => {
            btn.classList.remove('active');
        });
        
        document.getElementById(`${mode}-format`).classList.add('active');
        
        const query = document.getElementById('search-input').value;
        const outputHTML = document.getElementById('output').innerHTML;
        
        if (outputHTML.includes('data-verses') || outputHTML.includes('data-verse')) {
            if (query.trim()) {
                executeSearch(query);
            }
        } else if (currentBook && currentChapter) {
            displayChapter(currentBook, currentChapter, currentVerse ? [currentVerse] : []);
        }
    }
    
    function loadInitialData() {
        if (bibleBooks.length > 0) {
            selectBook(bibleBooks[0].name, true);
        }
    }
