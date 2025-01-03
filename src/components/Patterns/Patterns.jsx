import "./Patterns.css";
import { useContext, useEffect } from "react";
import { DataContext } from "../../context/DataContext";

export default function Patterns() {
  const { patternsData, activeTimeframe, filterData } = useContext(DataContext);

  useEffect(() => {
    if (!activeTimeframe) {
      filterData("H1");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterOtherData = patternsData.filter(
    (item) => !activeTimeframe || item.timeframe === activeTimeframe
  );

  // console.log(filterOtherData);

  return (
    <div className="patterns">
      <div className="patterns_content">
        <div className="patterns_section">
          {filterOtherData.map((item) => {
            let barColor;
            if (item.candle_strength === 10) {
              barColor = "red";
            } else if (item.candle_strength === 20) {
              barColor = "orange";
            } else if (item.candle_strength === 30) {
              barColor = "yellow";
            } else if (item.candle_strength === 40) {
              barColor = "greenyellow";
            } else {
              barColor = "green";
            }

            let tradeSignalColor;
            if (item.trade_signal === "Buy") {
              tradeSignalColor = "#60d938";
            } else if (item.trade_signal === "Sell") {
              tradeSignalColor = "#ed250e";
            }

            return (
              <>
                <div key={item.id} className="patterns_info">
                  <div className="patterns_group">
                    <div className="patterns_info_div">
                      <p className="patterns_header">Symbol</p>
                      <p className="patterns_value">{item.symbol}</p>
                    </div>
                    <div className="patterns_info_div">
                      <p className="patterns_header">Trade Signal</p>
                      <p
                        className="patterns_value"
                        style={{ color: tradeSignalColor }}
                      >
                        {item.trade_signal}
                      </p>
                    </div>
                  </div>
                  <div className="patterns_group">
                    <div className="patterns_info_div">
                      <p className="patterns_header">Candle Type</p>
                      <p className="patterns_value">{item.candle_type}</p>
                    </div>
                    <div className="patterns_info_div">
                      <p className="patterns_header">Strength</p>
                      <div className="strength">
                        <div
                          className="strength_bar"
                          style={{
                            width: `${item.candle_strength * 2}px`,
                            backgroundColor: barColor,
                          }}
                        ></div>
                        <p className="patterns_value">
                          %{item.candle_strength * 2}
                        </p>
                      </div>
                    </div>
                  </div>
                  <span className="patterns_value_side">
                    {item.formatted_age}
                  </span>
                </div>
                <hr />
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}
