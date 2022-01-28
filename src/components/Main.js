import React, {useRef} from "react";
import dai from '../dai.png';
import web3 from "../web3";




const Main = ({dTokenBalance, stackingBalance, stakeTokens, eTokenBalance}) => {

    // const [inputValue, setInputValue] = useState("");
    
    const refInput = useRef();
    
    // ********************* submit function ************************* //
    const stackHandler =  (e) => {
          e.preventDefault();
          
          let amount;
              amount = refInput.current.value;
              amount = amount.toString();
              amount = web3.utils.toWei(amount, "ether");
        stakeTokens(amount);
        
    }

    return (
        <div id="content" className="mt-3">
  
          <table className="table table-borderless text-muted text-center">
            <thead>
              <tr>
                <th scope="col">Staking Balance</th>
                <th scope="col">Reward Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{web3.utils.fromWei(stackingBalance, "ether")} mDAI</td>
                <td>{web3.utils.fromWei(eTokenBalance, "ether")} Euro Token</td>
              </tr>
            </tbody>
          </table>
  
          <div className="card mb-4" >
  
            <div className="card-body">
  
              <form className="mb-3" onSubmit={stackHandler}>

                <div className="balance-section">
                  <label className="float-left"><b id="balance-title">Stake Tokens</b></label>
                  <span className="float-right text-muted">
                    Balance: {web3.utils.fromWei(dTokenBalance, 'ether')}
                  </span>
                </div>

                <div className="input-group mb-4">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="0"
                    required
                    ref={refInput}
                    // value={inputValue}
                    // onChange={(e)=> setInputValue(e.target.value)}
                    />

                  <div className="input-group-append">
                    <div className="input-group-text">
                      <img src={dai} height='32' alt=""/>
                      &nbsp;&nbsp;&nbsp; mDAI
                    </div>
                  </div>

                </div>
                <button type="submit" className="btn btn-primary btn-block btn-lg">STAKE!</button>
              </form>

              <button type="submit" className="btn btn-primary btn-block btn-lg">UnStack</button>

            </div>
          </div>
  
        </div>
      );
}

export default Main;