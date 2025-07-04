from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationChain
import os
from dotenv import load_dotenv
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
# This memory object can be made session-based if you want chat persistence per user
memory = ConversationBufferMemory()

def chat_with_career_coach(user_message: str, gemini_api_key: str):
    llm = ChatGoogleGenerativeAI(
        model="gemini-1.5-flash",
        google_api_key=api_key
    )
    chain = ConversationChain(llm=llm, memory=memory)
    response = chain.predict(input=user_message)
    return response
