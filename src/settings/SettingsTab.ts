import { App, PluginSettingTab, Setting } from 'obsidian'
import { ChatStreamPlugin } from 'src/ChatStreamPlugin'
import { getModels } from './ChatStreamSettings'
import { CHAT_MODELS } from 'src/openai/chatGPT'

export class SettingsTab extends PluginSettingTab {
	plugin: ChatStreamPlugin

	constructor(app: App, plugin: ChatStreamPlugin) {
		super(app, plugin)
		this.plugin = plugin
	}

	display(): void {
		const { containerEl } = this

		containerEl.empty()

		new Setting(containerEl)
			.setName('Model')
			.setDesc('Select the GPT model to use.')
			.addDropdown((cb) => {
				getModels().forEach((model) => {
					cb.addOption(model, model)
				})
				cb.setValue(this.plugin.settings.apiModel)
				cb.onChange(async (value: string) => {
					this.plugin.settings.apiModel = value
					await this.plugin.saveSettings()
					// Trigger refresh to show/hide custom model input
					this.display()
				})
			})

		if (this.plugin.settings.apiModel === CHAT_MODELS.CUSTOMIZE.name) {
			new Setting(containerEl)
				.setName('Custom Model Name')
				.setDesc('Enter the name of your custom model')
				.addText((text) => {
					text
						.setPlaceholder('e.g., gpt-4-1106-vision-preview')
						.setValue(this.plugin.settings.customModelName)
						.onChange(async (value: string) => {
							this.plugin.settings.customModelName = value
							await this.plugin.saveSettings()
						})
				})
		}

		new Setting(containerEl)
			.setName('API key')
			.setDesc('The API key to use when making requests - Get from OpenAI')
			.addText((text) => {
				text.inputEl.type = 'password'
				text
					.setPlaceholder('API Key')
					.setValue(this.plugin.settings.apiKey)
					.onChange(async (value: string) => {
						this.plugin.settings.apiKey = value
						await this.plugin.saveSettings()
					})
			})

		new Setting(containerEl)
			.setName('System prompt')
			.setDesc(
				`The system prompt sent with each request to the API. \n(Note: you can override this by beginning a note stream with a note starting 'SYSTEM PROMPT'. The remaining content of that note will be used as system prompt.)`
			)
			.addTextArea((text) => {
				text
					.setPlaceholder('System prompt')
					.setValue(this.plugin.settings.systemPrompt)
					.onChange(async (value: string) => {
						this.plugin.settings.systemPrompt = value
						await this.plugin.saveSettings()
					})
				text.inputEl.rows = 8
				text.inputEl.cols = 40
			})

		new Setting(containerEl)
			.setName('API URL')
			.setDesc('The URL endpoint for chat')
			.addText((text) => {
				text
					.setPlaceholder('API URL')
					.setValue(this.plugin.settings.apiUrl)
					.onChange(async (value: string) => {
						this.plugin.settings.apiUrl = value
						await this.plugin.saveSettings()
					})
			})

		new Setting(containerEl)
			.setName('Temperature')
			.setDesc(
				'The temperature to use when generating responses (0-2). 0 means no randomness.'
			)
			.addText((text) => {
				text
					.setPlaceholder('Temperature')
					.setValue(String(this.plugin.settings.temperature))
					.onChange(async (value: string) => {
						const parsed = parseFloat(value)
						if (!isNaN(parsed) && parsed >= 0 && parsed <= 2) {
							this.plugin.settings.temperature = parsed
							await this.plugin.saveSettings()
						}
					})
			})

		new Setting(containerEl)
			.setName('Max input tokens')
			.setDesc(
				'The maximum number of tokens to send (up to model limit). 0 means as many as possible.'
			)
			.addText((text) => {
				text
					.setPlaceholder('Max input tokens')
					.setValue(String(this.plugin.settings.maxInputTokens))
					.onChange(async (value: string) => {
						this.plugin.settings.maxInputTokens = Number(value)
						await this.plugin.saveSettings()
					})
			})

		new Setting(containerEl)
			.setName('Max response tokens')
			.setDesc(
				'The maximum number of tokens to return from the API. 0 means no limit. (A token is about 4 characters).'
			)
			.addText((text) => {
				text
					.setPlaceholder('Max response tokens')
					.setValue(String(this.plugin.settings.maxResponseTokens))
					.onChange(async (value: string) => {
						this.plugin.settings.maxResponseTokens = Number(value)
						await this.plugin.saveSettings()
					})
			})

		new Setting(containerEl)
			.setName('Max depth')
			.setDesc(
				'The maximum depth of ancestor notes to include. 0 means no limit.'
			)
			.addText((text) => {
				text
					.setPlaceholder('Max depth')
					.setValue(String(this.plugin.settings.maxDepth))
					.onChange(async (value: string) => {
						this.plugin.settings.maxDepth = Number(value)
						await this.plugin.saveSettings()
					})
			})

		new Setting(containerEl)
			.setName('Debug')
			.setDesc('Enable debug output in the console')
			.addToggle((toggle) => {
				toggle
					.setValue(this.plugin.settings.debug)
					.onChange(async (value: boolean) => {
						this.plugin.settings.debug = value
						await this.plugin.saveSettings()
					})
			})
	}
}

export default SettingsTab
