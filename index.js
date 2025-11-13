import net from 'net';
// import mysql from 'mysql2';

// --- Configuration base de données ---
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'tracking_db'
// });

// --- Création du serveur TCP ---
const server = net.createServer((socket) => {
  console.log('Nouvelle balise connectée :', socket.remoteAddress, socket.remotePort);

  socket.on('data', (data) => {
    const message = data.toString().trim();
    console.log('Données reçues :', message);

    // Exemple de trame: "ID123,15.9876,-17.5678,50"
    const parts = message.split(',');
    const id = parts[0];
    const latitude = parts[1];
    const longitude = parts[2];
    const vitesse = parts[3];

    // Insertion dans la base
    const sql = "INSERT INTO positions (balise_id, latitude, longitude, vitesse) VALUES (?, ?, ?, ?)";
    // db.query(sql, [id, latitude, longitude, vitesse], (err) => {
    //   if (err) console.error('Erreur d’insertion :', err);
    //   else console.log('Position enregistrée avec succès');
    // });
  });

  socket.on('close', () => {
    console.log('Balise déconnectée');
  });

  socket.on('error', (err) => {
    console.error('Erreur socket :', err);
  });
});

// --- Démarrage du serveur sur le port 5900 ---
server.listen(5900, () => {
  console.log('Serveur TCP en écoute sur le port 5900');
});

// pour tester veuillez utiliser un client TCP comme netcat ou telnet
// Exemple avec netcat :
// nc localhost 5900 