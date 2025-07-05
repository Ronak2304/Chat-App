import Navbar from "../components/Navbar";
import { useChatStore } from "../store/chatStore";
import ShowUsers from "../components/ShowUsers";
import { Loader } from "lucide-react";
import ChatSection from "../components/ChatSection";
import PreSelection from "../components/PreSelection";

const Home = () => {
  const { users, selectedUser } = useChatStore();
  return (
    <div>
      <Navbar />
      <div className="flex flex-row gap-10">
        <div>
          {users ? (
            <div>
              <ShowUsers />
            </div>
          ) : (
            <div>
              <Loader className="animate-spin size-10" />
            </div>
          )}
        </div>
        <div>
          {selectedUser ? (
            <div>
              <ChatSection />
            </div>
          ) : (
            <div>
              <PreSelection />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
