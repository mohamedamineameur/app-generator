import {
  Box,
  Typography,
  Stack,
  Paper,
  Divider,
  Link,
  IconButton,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useLanguage } from "../contexts/LanguageContext";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import { FaTiktok } from "react-icons/fa";


const ContactPage = () => {
  const { language } = useLanguage();

  const labels = {
    title: language === "fr" ? "Coordonnées" : "Contact Information",
    address: language === "fr" ? "Adresse" : "Address",
    phone: language === "fr" ? "Téléphone" : "Phone",
    email: language === "fr" ? "Adresse email" : "Email Address",
    hours: language === "fr" ? "Horaires" : "Hours",
    monFri: language === "fr" ? "Lun - Ven : 9h à 18h" : "Mon - Fri: 9AM to 6PM",
    sat: language === "fr" ? "Samedi : 10h à 16h" : "Saturday: 10AM to 4PM",
    closed: language === "fr" ? "Dimanche : 10h à 16h" : "Sunday: 10h à 16h",
  };

  return (
    <Box sx={{ padding: 4, maxWidth: "900px", margin: "0 auto" }}>
         <h1 style={{
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0
}}>
  <span lang="fr">Photographe de mariage à Ottawa – Thiziri</span> | <span lang="en">Wedding Photographer in Ottawa – Thiziri</span>
</h1>
      <Typography
        variant="h4"
        sx={{ color: "#ccac70", fontWeight: "bold", mb: 3 }}
      >
        {labels.title}
      </Typography>

      <Paper elevation={3} sx={{ padding: 3, borderRadius: 4, backgroundColor: "#000", color: "#fff" }}>
        <Stack spacing={2}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <LocationOnIcon sx={{ color: "#ccac70" }} />
            <Typography>
              2190 Tenth Line, Orléans, ON K4A 5M7, Canada
            </Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={2}>
            <PhoneIcon sx={{ color: "#ccac70" }} />
            <Link href="tel:+16133049338" underline="hover" color="#ccac70">
              +1 (613) 304-9338
            </Link>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={2}>
            <EmailIcon sx={{ color: "#ccac70" }} />
            <Link href="mailto:thizirimeddour@gmail.com" underline="hover" color="#ccac70">
              thizirimeddour@gmail.com
            </Link>
          </Stack>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.2)", my: 2 }} />

          <Stack direction="row" alignItems="flex-start" spacing={2}>
            <AccessTimeIcon sx={{ color: "#ccac70", mt: 0.5 }} />
            <Box>
              <Typography>{labels.monFri}</Typography>
              <Typography>{labels.sat}</Typography>
              <Typography>{labels.closed}</Typography>
            </Box>
          </Stack>
        </Stack>
      </Paper>

      <Box
  sx={{
    mt: 4,
    display: "flex",
    justifyContent: "center",
    gap: 3,
  }}
>
  {[
    {
      icon: <FacebookIcon fontSize="inherit" />,
      href: "https://facebook.com"
    },
    {
      icon: <InstagramIcon fontSize="inherit" />,
      href: "https://instagram.com"
    },
    {
      icon: <PinterestIcon fontSize="inherit" />,
      href: "https://pinterest.com"
    },
    {
      icon: <FaTiktok size={32} />, // React-icons support
      href: "https://www.tiktok.com/"
    }
  ].map((social, i) => (
    <IconButton
      key={i}
      component="a"
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        backgroundColor: "#ccac70",
        color: "#000",
        width: 64,
        height: 64,
        borderRadius: "50%",
        fontSize: 36,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "&:hover": {
          backgroundColor: "#c68b30",
        },
      }}
    >
      {social.icon}
    </IconButton>
  ))}
</Box>





      {/* Facultatif : carte Google Maps intégrée */}
      <Box mt={4}>
  <iframe
    title="Google Maps"
    src="https://www.google.com/maps?q=45.454564,-75.484979&hl=fr&z=14&output=embed"
    width="100%"
    height="300"
    style={{ border: 0, borderRadius: "12px" }}
    allowFullScreen
    loading="lazy"
  ></iframe>
</Box>

    </Box>
  );
};

export default ContactPage;
