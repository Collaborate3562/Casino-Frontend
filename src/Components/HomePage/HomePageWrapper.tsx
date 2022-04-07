import styled from "styled-components";
import background from "./background.png";

const Wrapper = styled.div`
   height: 100%;
   display: flex;
   align-items: center;
   justify-content: center;
   background-size: cover;
   background-repeat: no-repeat;
`;
const HomePageWrapper: React.FC = ({ children }) => {
   return (
      <Wrapper style={{ background: `linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(146,33,231,1) 35%, rgba(0,212,255,1) 100%)` }}>
         {children}
      </Wrapper>
   );
};

export default HomePageWrapper;
