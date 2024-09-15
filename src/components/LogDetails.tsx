import { Box, Typography } from "@mui/material";
import { Log } from "../interfaces/log";
import { useEffect } from "react";
import { LogParser } from "../services/logParser";

type prop = {
  log: Log;
};

export function LogDetails({ log }: prop) {
  useEffect(() => {
    console.log(log);
  }, []);

  return (
    <>
      <div style={{ maxWidth: "90vw", minWidth: "40vw", margin: "1rem" }}>
        <Typography variant="h2" sx={{ marginBottom: "2rem" }}>
          Details
        </Typography>
        <LogField
          fieldName="Timestamp"
          value={log.timestamp.toLocaleString()}
        ></LogField>
        <LogField fieldName="Container" value={log.containerName}></LogField>
        <LogMessage log={log}></LogMessage>
      </div>
    </>
  );
}

function LogField(prop: { fieldName: string; value: string }) {
  return (
    <>
      <div
        className="flex"
        style={{ gap: "1rem", whiteSpace: "pre-wrap", marginBottom: "0.5rem" }}
      >
        <Typography variant="body1">{prop.fieldName}</Typography>
        <Typography variant="body1">:</Typography>
        <Typography variant="body1">{prop.value}</Typography>
      </div>
    </>
  );
}

function LogMessage(prop: { log: Log }) {
  const logObejct = LogParser.tryParseJson(prop.log.log);
  if (logObejct !== null) {
    return (
      <>
        <div
          className="flex"
          style={{
            gap: "1rem",
            whiteSpace: "pre-wrap",
            marginBottom: "0.5rem",
          }}
        >
          <Typography variant="body1">Message</Typography>
          <Typography variant="body1">:</Typography>
          <Typography variant="body1">
            {JSON.stringify(logObejct, null, 4)}
          </Typography>
        </div>
      </>
    );
  }
  return (
    <>
      <div
        className="flex"
        style={{ gap: "1rem", whiteSpace: "pre-wrap", marginBottom: "0.5rem" }}
      >
        <Typography variant="body1">Message</Typography>
        <Typography variant="body1">:</Typography>
        <div>
          <Typography variant="body1">{prop.log.log}</Typography>
        </div>
      </div>
    </>
  );
}
