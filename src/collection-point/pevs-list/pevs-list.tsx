import { Button, Card, CardContent, Typography } from "@mui/material";

export default function PEVSList() {
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
