const crypto = require('bcryptjs')

class CryptoService {
	encrypt(str) {
		return new Promise((resolve, reject) => {
			crypto.genSalt(10, (err, salt) => {
				if (err) return reject(err)
				crypto.hash(str, salt, (err, hash) => {
					if (err) return reject(err)
					return resolve(hash)
				})
			})
		})
	}

	compare(hash, str) {
		return new Promise((resolve, reject) => {
			crypto.compare(str, hash, (err, res) => {
				if (err) return reject(err)
				resolve(res)
			})
		})
	}
}

module.exports = new CryptoService()
