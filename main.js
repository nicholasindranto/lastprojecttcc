const dataList = document.getElementById('data-list');
const addForm = document.getElementById('add-form');

// Fungsi untuk mendapatkan data dari API
const getData = async () => {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    dataList.innerHTML = '';

    data.forEach(item => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `${item.name} - ${item.email}`;
      dataList.appendChild(listItem);
    });
  } catch (error) {
    console.error('Gagal mendapatkan data:', error);
  }
};

// Fungsi untuk menambahkan data melalui API
const addData = async (event) => {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;

  try {
    await fetch('/api/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email })
    });
    addForm.reset();
    getData();
  } catch (error) {
    console.error('Gagal menambahkan data:', error);
  }
};

// Menjalankan fungsi getData saat halaman dimuat
getData();

const updateForm = document.getElementById('update-form');
const deleteForm = document.getElementById('delete-form');

// Fungsi untuk mengirim permintaan update data melalui API
const updateData = async (event) => {
  event.preventDefault();
  const id = document.getElementById('update-id').value;
  const name = document.getElementById('update-name').value;
  const email = document.getElementById('update-email').value;

  try {
    await fetch(`/api/data/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email })
    });
    updateForm.reset();
    getData();
  } catch (error) {
    console.error('Gagal mengubah data:', error);
  }
};

// Fungsi untuk mengirim permintaan hapus data melalui API
const deleteData = async (event) => {
  event.preventDefault();
  const id = document.getElementById('delete-id').value;

  try {
    await fetch(`/api/data/${id}`, {
      method: 'DELETE'
    });
    deleteForm.reset();
    getData();
  } catch (error) {
    console.error('Gagal menghapus data:', error);
  }
};

// Menambahkan form untuk update data
const updateDataForm = `
  <h2>Update Data:</h2>
  <form id="update-form">
    <label for="update-id">ID:</label>
    <input type="text" id="update-id" required>
    <br>
    <label for="update-name">Nama:</label>
    <input type="text" id="update-name" required>
    <br>
    <label for="update-email">Email:</label>
    <input type="email" id="update-email" required>
    <br>
    <button type="submit">Update</button>
  </form>
`;

// Menambahkan form untuk hapus data
const deleteDataForm = `
  <h2>Hapus Data:</h2>
  <form id="delete-form">
    <label for="delete-id">ID:</label>
    <input type="text" id="delete-id" required>
    <br>
    <button type="submit">Hapus</button>
  </form>
`;

// Menampilkan form update dan delete
document.body.innerHTML += updateDataForm + deleteDataForm;

// Mengaitkan fungsi updateData dengan submit form update
updateForm.addEventListener('submit', updateData);

// Mengaitkan fungsi deleteData dengan submit form delete
deleteForm.addEventListener('submit', deleteData);


// Mengaitkan fungsi addData dengan submit form
addForm.addEventListener('submit', addData);
