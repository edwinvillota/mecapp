import SQLite from 'react-native-sqlite-storage'
SQLite.enablePromise(true)
SQLite.DEBUG(true)

const database_name = 'Balances_DB'
const database_location = 'default'
const database_createFromLocation = '~www/Balances_DB'

class DB {

    static database

    constructor() {
        if (!!DB.database) {
            return DB.database
        }
        DB.database = this
    }

    async _init () {
        if (!this.db) {
            const openDB = new Promise ((resolve, reject) => {
                SQLite.openDatabase(
                    {
                        name: database_name,
                        location: database_location,
                        createFromLocation: database_createFromLocation
                    },
                    db => {
                        DB.database.db = db
                        resolve(db)
                    },
                    error => {reject(error)}
                )
            })
    
            return openDB
        }
        return
    }

    close() {
        this.db.close()
        this.db = undefined
        DB.database = undefined
    }

    query (sql, args = []) {
        return new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                        tx.executeSql(sql, args, (tx, results) => {
                            const rows = results.rows
                            const data = []
                            for (let i = 0; i < rows.length; i++) {
                                data.push(rows.item(i))
                            }
                            resolve({data, rows_affected: results.rowsAffected})
                        })
                    })
                .catch(error => {
                    reject(error)
                })
        })
    }
}

export default DB