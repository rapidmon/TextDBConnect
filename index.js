function autoResizeTextarea(textarea) {
    textarea.style.height = 'auto'; // 기존 높이를 초기화
    textarea.style.height = textarea.scrollHeight + 'px'; // 내용에 맞게 높이 조정
}

// 업로드 기능
async function uploadArticle() {
    const projectName = document.getElementById('projectName').value;
    const articleContent = document.getElementById('articleContent').value;
    const secretCode = document.getElementById('secretCode').value;

    const bodyText = `ProjectName=${projectName}&Article=${articleContent}&Code=${secretCode}`;

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
    document.getElementById('articleContent').value = '';
    document.getElementById('articleContent').style.height = 'auto';
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

    if (result.article_Data[0]) {
        document.getElementById('articleContent').value = result.article_Data[0].Article;
        document.getElementById('articleContent').style.height = document.getElementById('articleContent').scrollHeight + 'px'; 
        alert("Article loaded successfully.");
    } else {
        alert("No article found for the given Project Name.");
    }
}