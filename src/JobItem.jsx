import {Box, Button, Card, CardActions, CardContent, Chip, Link, Stack, Typography} from "@mui/material";

export default function JobItem({job}) {

  return (
    <Card
      variant="outlined"
      sx={{
        marginY: 1
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {job.title}
        </Typography>
        <Stack direction="row" spacing={1} sx={{paddingTop: 1}}>
          {job.contractType &&
            job.contractType.map((val, key)=>
            <Chip key={key} label={val}/>)}
          {job.company &&
            <Chip label={job.company}/>}
          {job.jobTitle &&
            <Chip label={job.jobTitle}/>}
          {job.salary &&
            <Chip label={job.salary}/>}
        </Stack>
        <Typography variant="body2" gutterBottom sx={{paddingTop: 2}}>
          {job.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          href={job.link}
          target="_blank"
          rel="noreferrer"
        >Postuler</Button>
      </CardActions>
    </Card>
  );
}