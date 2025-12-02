import React from 'react';
import { img_300 } from '../../utils';

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const MyCard = ({ backdrop_path, title, overview, release_date, vote_average }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345, margin: 2, borderRadius: '16px', boxShadow: 3 }}>
      <CardHeader
        title={title}
        subheader={`Release: ${release_date || 'Unknown'}`}
      />

      <CardMedia
        component="img"
        height="180"
        image={backdrop_path ? img_300 + backdrop_path : '/no-image.jpg'}
        alt={title}
        sx={{ objectFit: 'cover' }}
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          ⭐ {vote_average}/10
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {overview.length > 120 ? overview.slice(0, 120) + '...' : overview}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded ? 'true' : undefined}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Description:</Typography>
          <Typography paragraph>{overview}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};
