import { render } from 'preact';
import { useRef, useState } from 'preact/hooks';
import { send } from './geminiservice';
import './style.css';

interface Message {
	text: string;
	isUser: boolean;
}

export function App() {
	const inputRef = useRef<HTMLInputElement>(null);
	const [messages, setMessages] = useState<Message[]>([
		{ text: 'Hello! How can I help you today?', isUser: false }
	]);

	const handleSend = async () => {
		const input = inputRef.current;
		if (!input || !input.value.trim()) return;

		const userMessage = input.value.trim();
		
		// Add user message to chat
		setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
		
		// Clear input
		input.value = '';
		
		// Send to Gemini and get response
		try {
			const response = await send(userMessage);
			setMessages(prev => [...prev, { text: response, isUser: false }]);
		} catch (error) {
			console.error('Error sending message:', error);
			setMessages(prev => [...prev, { text: 'Sorry, there was an error processing your message.', isUser: false }]);
		}
	};

	const handleKeyPress = (e: any) => {
		if (e.key === 'Enter') {
			handleSend();
		}
	};

	return (
		<div>
			<div class="messages-container">
				{messages.map((msg, index) => (
					<div key={index} class={`bubble ${msg.isUser ? 'bubble-right' : 'bubble-left'}`}>
						<p>{msg.text}</p>
					</div>
				))}
			</div>
			<div class="chat-container">
				<input 
					type="text" 
					ref={inputRef} 
					onKeyDown={handleKeyPress}
					placeholder="Type your message..."
				/>
				<Button onClick={handleSend} />
			</div>
		</div>
	);
}

function Button(props) {
	return (
		<button class="button" onClick={props.onClick}>{"Send"}</button>
	);
}

render(<App />, document.getElementById('app'));
