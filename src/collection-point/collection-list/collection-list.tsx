import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { styled as styledComponents } from "styled-components";

export default function CollectionList() {
  const cards = [
    { title: "Card 1", subtitle: "Subtitle 1" },
    { title: "Card 2", subtitle: "Subtitle 2" },
    { title: "Card 3", subtitle: "Subtitle 3" },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "10px",
        marginTop: "20px",
        width: "100%",
      }}
    >
      {cards.map((card, index) => (
        <Card
          key={index}
          style={{
            marginLeft: "10px",
            marginRight: "10px",
            backgroundColor: " rgba(221, 195, 147, 0.2)",
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              component="h2"
              style={{ fontWeight: "bold" }}
            >
              {card.title}
            </Typography>
            <Typography variant="body1" color="textSecondary" component="p">
              {card.subtitle}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              style={{ padding: "8px 16px", borderRadius: "5px" }}
            >
              Coletar aqui
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
