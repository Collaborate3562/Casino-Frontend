import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import activeBg from '../../images/btn_active.png'
import inactiveBg from '../../images/btn_inactive.png'
const MainTabs = (props) => {

   return (
      <div className="tabs">
         {props.tabList.map((tabName, i) =>
            <button key={i} className={"relative transform -ml-6 xl:-ml-9"} onClick={() => { props?.HandleTabChange(tabName) }}>
               <img src={props.currentTab === tabName ? activeBg : inactiveBg} alt="button" />
               <p className='absolute whitespace-nowrap top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-league-gothic text-app-yellow text-sm md:text-xl xl:text-2xl -ml-2 xl:-ml-4'>{tabName} </p>
            </button>
         )}
      </div>
   );
};

const mapStateToProps = (state) => ({
   currentTab: state.LobbyReducer.currentTab,
   tabList: state.LobbyReducer.tabList
})

const mapDispatchToProps = (dispatch) => {
   return bindActionCreators(
      {
         ...global.Actions.LobbyAction,
      },
      dispatch,
   );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainTabs)
