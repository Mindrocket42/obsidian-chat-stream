import { request, RequestUrlParam } from 'obsidian'
import { openai } from './chatGPT-types'

export const DEFAULT_OPENAI_COMPLETIONS_URL = `https://api.openai.com/v1/chat/completions`
export const OPENAI_COMPLETIONS_URL = DEFAULT_OPENAI_COMPLETIONS_URL

export const getOpenAICompletionsURL = (configuredUrl?: string): string => {
	return configuredUrl || DEFAULT_OPENAI_COMPLETIONS_URL
}

export type ChatModelSettings = {
	name: string,
	tokenLimit: number,
	encodingFrom?: string
}

export const CHAT_MODELS = {
	GPT_35_TURBO: {
		name: 'gpt-3.5-turbo',
		tokenLimit: 4096
	},
	GPT_35_16K: {
		name: 'gpt-3.5-turbo-16k',
		tokenLimit: 16385
	},
	GPT_35_TURBO_0125: {
		name: 'gpt-3.5-turbo-0125',
		tokenLimit: 16385
	},
	GPT_4o: {
		name: 'gpt-4o',
		tokenLimit: 128000
	},
	GPT_4o_MINI: {
		name: 'gpt-4o-mini',
		encodingFrom: 'gpt-4o',
		tokenLimit: 16384
	},
	GPT_4: {
		name: 'gpt-4',
		tokenLimit: 8192
	},
	GPT_4_TURBO_PREVIEW: {
		name: 'gpt-4-turbo-preview',
		tokenLimit: 128000
	},
	GPT_45_PREVIEW: {
		name: 'gpt-4.5-preview',
		tokenLimit: 128000
	},
	GPT_4_0125_PREVIEW: {
		name: 'gpt-4-0125-preview',
		tokenLimit: 128000
	},
	GPT_4_32K: {
		name: 'gpt-4-32k',
		tokenLimit: 32768
	},
	GPT_4_32K_0613: {
		name: 'gpt-4-32k-0613',
		tokenLimit: 32768
	},
	MANUAL_PROCESSING: {
		name: 'manual-processing',
		tokenLimit: 100000,
		encodingFrom: 'gpt-4'
	},
	O3_MINI_HIGH: {
		name: 'o3-mini-high',
		tokenLimit: 200000
	},
	O3_MINI: {
		name: 'o3-mini',
		tokenLimit: 200000
	},
	O1: {
		name: 'o1',
		tokenLimit: 200000
	},
	O1_MINI: {
		name: 'o1-mini',
		tokenLimit: 128000
	},
	CHATGPT_4O_LATEST: {
		name: 'gpt-4o-latest',
		tokenLimit: 128000
	},
	CUSTOMIZE: {
		name: 'customize',
		tokenLimit: Infinity
	}
}

export type ChatGPTModel = keyof typeof CHAT_MODELS

export function chatModelByName(name: string) {
	return Object.keys(CHAT_MODELS)
		.map(key => CHAT_MODELS[key as keyof typeof CHAT_MODELS])
		.find((model: ChatModelSettings) => model.name === name)
}

export const defaultChatGPTSettings: Partial<openai.CreateChatCompletionRequest> =
{
	model: CHAT_MODELS.GPT_35_TURBO.name,
	max_tokens: 500,
	temperature: 0,
	top_p: 1.0,
	presence_penalty: 0,
	frequency_penalty: 0,
	stop: []
}

export function getChatGPTCompletion(
	apiKey: string,
	apiUrl: string,
	model: openai.CreateChatCompletionRequest['model'],
	messages: openai.CreateChatCompletionRequest['messages'],
	settings?: Partial<
		Omit<openai.CreateChatCompletionRequest, 'messages' | 'model'>
	>,
	customModelName?: string
): Promise<string | undefined> {
	const headers = {
		Authorization: `Bearer ${apiKey}`,
		'Content-Type': 'application/json'
	}
	const actualModel = model === CHAT_MODELS.CUSTOMIZE.name && customModelName
		? customModelName
		: (model ?? CHAT_MODELS.GPT_35_TURBO.name)
	const body: openai.CreateChatCompletionRequest = {
		messages,
		model: actualModel,
		...settings
	}
	const requestParam: RequestUrlParam = {
		url: getOpenAICompletionsURL(apiUrl),
		method: 'POST',
		contentType: 'application/json',
		body: JSON.stringify(body),
		headers
	}
	console.debug('Calling openAI', requestParam)
	return request(requestParam)
		.then((response: string) => {
			const res: openai.CreateChatCompletionResponse = JSON.parse(response)
			return res?.choices?.[0]?.message?.content
		})
		.catch((err: Error) => {
			console.error(err)
			if ((err as any).code === 429) {
				console.error(
					'OpenAI API rate limit exceeded. If you have free account, your credits may have been consumed or expired.'
				)
			}
			return undefined
		})
}
