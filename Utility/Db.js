import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase("practical.db", "1.0", "raj", 200000);

export const StoreToDb = () => {

    let Users = [
        {
            "name": "Raj Paghadar",
            "username": "Raj066",
            "email": "rajpaghadar4@gmail.com",
            "phone": "1234568790",
            "website": "www.rajpatel.com",
            "company": "Digital Manufacturing"
        },
        {
            "name": "Raj Patel",
            "username": "Patel9874",
            "email": "rajpatel@gmail.com",
            "phone": "1234568790",
            "website": "www.rajpatel.com",
            "company": "Digital Manufacturing"
        }
    ];

    db.transaction((txn) => {
        txn.executeSql(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='users'",
            [],
            (tx, res) => {
                // console.log('item:', res.rows.length);
                if (res.rows.length == 0) {
                    txn.executeSql('DROP TABLE IF EXISTS users', []);
                    txn.executeSql(
                        'CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR, username VARCHAR, email VARCHAR, phone VARCHAR, website VARCHAR, company VARCHAR)',
                        []
                    );

                    // for (let index = 0; index < Users.length; index++) {
                    //     const item = Users[index];

                    //     db.transaction((tx) => {
                    //         tx.executeSql(
                    //             'INSERT INTO users (name, username, email, phone, website, company ) VALUES (?,?,?,?,?,?)',
                    //             [item.name, item.username, item.email, item.phone, item.website, item.company],
                    //             (tx, results) => {

                    //             }
                    //         );
                    //     });

                    // }

                }
                else {

                }


            }
        );
    })

}
