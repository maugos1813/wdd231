document.getElementById('year').textContent = new Date().getFullYear();
    document.getElementById('lastModified').textContent = document.lastModified;

    const params = new URLSearchParams(window.location.search);
    const infoList = document.getElementById('submitted-info');
    const fields = ['fname','lname','email','phone','organization','timestamp'];

    fields.forEach(f => {
      const li = document.createElement('li');
      li.textContent = `${f.replace(/^\w/, c => c.toUpperCase())}: ${params.get(f) || ''}`;
      infoList.appendChild(li);
    });