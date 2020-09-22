const ENV = process.env.NODE_ENV || 'development';

const baseConfig = {
	client: 'pg',
	migrations: {
		directory: './db/migrations'
	},
	seeds: {
		directory: './db/seeds'
	}
};

const customConfig = {
	development: {
		connection: {
			database: 'nc_news',
			user: 'p',
			password: 'p'
		}
	},
	test: {
		connection: {
			database: 'nc_news_test',
			user: 'p',
			password: 'p'
		}
	}
};

module.exports = { ...customConfig[ENV], ...baseConfig };
