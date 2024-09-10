const quill = new Quill('#editor', {
    theme: 'snow',
    modules: {
        toolbar: [
            [{ 'size': [] }], // 폰트와 크기 선택
            ['bold', 'italic', 'underline', 'strike'], // 굵기, 기울임, 밑줄, 취소선
            [{ 'color': [] }, { 'background': [] }], // 텍스트 색상, 배경 색상
            [{ 'align': [] }], // 정렬
            [{ 'list': 'ordered' }, { 'list': 'bullet' }], // 리스트
            ['link', 'image'], // 링크, 이미지
            ['clean'] // 서식 제거
        ]
    }
});

// 에디터의 텍스트 변화 감지 시 자동 높이 조정
quill.on('text-change', function() {
    autoResizeQuillEditor();
});

function autoResizeQuillEditor() {
    const editor = document.querySelector('.ql-editor'); // Quill 에디터 내부 편집 영역
    editor.style.height = 'auto'; // 기존 높이를 초기화
    editor.style.height = editor.scrollHeight + 'px'; // 내용에 맞게 높이 조정
}

// 업로드 기능
async function uploadArticle() {
    const projectName = document.getElementById('projectName').value;
    const articleContent = quill.root.innerHTML; // Quill 에디터의 내용을 가져옴
    const secretCode = document.getElementById('secretCode').value;

    // 쿼리 스트링 형식으로 변환 (Quill의 HTML 내용을 encode)
    const bodyText = `ProjectName=${encodeURIComponent(projectName)}&Article=${encodeURIComponent(articleContent)}&Code=${encodeURIComponent(secretCode)}`;

    const response = await fetch('https://qyolel65iqtf6jpurhmjm4nble0taiua.lambda-url.ap-southeast-2.on.aws/', {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain',
        },
        body: bodyText,
    });

    const result = await response.json();
    alert(result.message);

    // 입력칸 초기화
    document.getElementById('projectName').value = '';
    quill.setText(''); // Quill 에디터 내용을 초기화
    document.getElementById('secretCode').value = '';
}

// 불러오기 기능
async function fetchArticle() {
    const projectName = document.getElementById('projectName').value;

    if (!projectName) {
        alert("Please enter a Project Name.");
        return;
    }

    const response = await fetch(`https://nejcsnqedlknfloylmfdverope0ptezn.lambda-url.ap-southeast-2.on.aws/?ProjectName=${projectName}`);
    const result = await response.json();

    if (result.article_Data.length > 0) {
        quill.root.innerHTML = result.article_Data[0].Article; // Quill 에디터에 내용을 채움
        alert("Article loaded successfully.");
    } else {
        alert("No article found for the given Project Name.");
    }
}