package accounts

import (
	"encoding/json"
	"github.com/doelia/go-bourbaki/src/globals"
	"log"
	"os"

	"github.com/boltdb/bolt"
)

var db *bolt.DB
var err error

var accountLogger = log.New(os.Stdout, "[BD] ", 0)

// OpenDB Permet l'ouverture de la base de données
func OpenDB() {
	accountLogger.Println("Ouverture de la base de donnée...")
	db, err = bolt.Open("bourbaki.db", 0600, nil)
	accountLogger.Println("Base de donnée prête.")
	if err != nil {
		globals.ErrLogger.Println("Erreur à l'ouverture de la base de données")
	}
	db.Update(func(tx *bolt.Tx) error {
		_, err := tx.CreateBucketIfNotExists([]byte("Accounts"))
		return err
	})
}

// addInDB Permet l'ajout de a dans la bd
// @param cle string: Name de l'account à ajouter
// @param a Account : La structure account à ajouter
// @return bool : Vrai si l'ajout a bien été fait, faux sinon
func addInDB(cle string, account Account) bool {
	jsonaccount, _ := json.Marshal(account)
	db.Update(func(tx *bolt.Tx) error {
		bucket := tx.Bucket([]byte("Accounts"))
		err = bucket.Put([]byte(cle), []byte(jsonaccount))
		return err
	})
	if err != nil {
		globals.ErrLogger.Println("Erreur lors de l'ajout dans la DB")
		return false
	}
	return true
}

// GetFromDB Récupère l'account ayant pour clé celle passée en paramètre
// @param cle: Name de l'account à récupérer
// @return Account: Le compte correspondant
func GetFromDB(cle string) (account Account) {
	db.View(func(tx *bolt.Tx) error {
		bucket := tx.Bucket([]byte("Accounts"))
		v := bucket.Get([]byte(cle))
		json.Unmarshal(v, &account)
		return nil
	})
	return
}

// GetAllAccounts Permet de récupérer la liste de tous les comptes de la base de données
func GetAllAccounts() (list globals.Classement) {
	db.View(func(tx *bolt.Tx) error {
		bucket := tx.Bucket([]byte("Accounts"))
		bucket.ForEach(func(name, account []byte) error {
			var accountStruct Account
			json.Unmarshal(account, &accountStruct)
			newPlayer := globals.PlayerClassement{0, 0, accountStruct.Name, accountStruct.Points, accountStruct.NbrGames, accountStruct.NbrWins}
			list = append(list, newPlayer)
			return nil
		})
		return nil
	})
	return
}

// UpdateAccount Met à jour l'account passé en parametre dans la BD
// @param updatedAccount: le compte à insérer dans la BD
// @return bool: vaut vrai si l'update a fonctionné, faux sinon
func UpdateAccount(updatedAccount Account) bool {
	jsonaccount, _ := json.Marshal(updatedAccount)
	db.Update(func(tx *bolt.Tx) error {
		bucket := tx.Bucket([]byte("Accounts"))
		err = bucket.Put([]byte(updatedAccount.Name), []byte(jsonaccount))
		return err
	})
	if err != nil {
		globals.ErrLogger.Println("Erreur update de l'account dans la DB")
		return false
	}
	return true
}

// Exists Permet de savoir si un compte existe pour la clé ou pas
// @param cle: Name de l'account recherché
// @return Account: Le compte s'il existe
// @return bool: Vrai si le compte existe, faux sinon
func Exists(cle string) (Account, bool) {
	var account Account
	db.View(func(tx *bolt.Tx) error {
		bucket := tx.Bucket([]byte("Accounts"))
		v := bucket.Get([]byte(cle))
		json.Unmarshal(v, &account)
		return nil
	})
	return account, account.Name != ""
}
