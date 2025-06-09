#!/bin/bash

API_URL="https://16juj9qjsj.execute-api.us-west-2.amazonaws.com/profile"
CONTENT_TYPE="Content-Type: application/json"

curl -X PUT $API_URL -H "$CONTENT_TYPE" -d '{
  "name": "Bennett Hamilton",
  "bio": "Storytelling through ink. Quiet and focused.",
  "profile_pic": "https://stingr-bucket.s3.amazonaws.com/images/bennett-profile.jpg",
  "art_pictures": [
    "https://stingr-bucket.s3.amazonaws.com/images/taylor1.jpg",
    "https://stingr-bucket.s3.amazonaws.com/images/taylor2.jpg"
  ],
  "styles": ["linework", "traditional"],
  "location": "Bend, OR"
}'

curl -X PUT $API_URL -H "$CONTENT_TYPE" -d '{
  "name": "Kendrick Lamar",
  "bio": "My tattoos speak for the unheard.",
  "profile_pic": "https://stingr-bucket.s3.amazonaws.com/images/kendrick-profile.jpg",
  "art_pictures": [
    "https://stingr-bucket.s3.amazonaws.com/images/kendrick1.jpg",
    "https://stingr-bucket.s3.amazonaws.com/images/kendrick2.jpg"
  ],
  "styles": ["realism"],
  "location": "Compton, CA"
}'

curl -X PUT $API_URL -H "$CONTENT_TYPE" -d '{
    "name": "Milo James",
    "bio": "Gray cat. Loves naps and minimalist pawprints. Will scratch if disrespected.",
    "profile_pic": "https://stingr-bucket.s3.amazonaws.com/images/milo-profile.jpg",
    "art_pictures": [
      "https://stingr-bucket.s3.amazonaws.com/images/milo-art1.jpg",
      "https://stingr-bucket.s3.amazonaws.com/images/milo-art2.jpg"
    ],
    "styles": ["minimalist", "fine line", "linework"],
    "location": "Bend, OR"
}'

curl -X PUT $API_URL -H "$CONTENT_TYPE" -d '{
    "name": "Chappell Roan",
    "bio": "The Midwest Princess turned tattoo icon. Glam, glitter, and unapologetic artistry.",
    "profile_pic": "https://stingr-bucket.s3.amazonaws.com/images/chappell-profile.jpg",
    "art_pictures": [
      "https://stingr-bucket.s3.amazonaws.com/images/chappell-art1.jpg",
      "https://stingr-bucket.s3.amazonaws.com/images/chappell-art2.jpg"
    ],
    "styles": ["watercolor", "stick-and-poke"],
    "location": "Los Angeles, CA"
}'
