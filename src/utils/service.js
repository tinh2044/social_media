import { client } from "../client"

/**
 * It fetches a user from the database
 * @param id - The id of the user.
 * @returns An object with the user data.
 */
export const getUser = (id) => {
  /* A query to get the user from the database. */
  const query = `*[_type == 'user' && _id == '${id}'][0]`
  /* Fetching the data from the database. */
  const res = client.fetch(query)
  return res
}

export const findPicture = (searchTerm) => {
  const query = `*[_type == "pin" && title match '${searchTerm}' || category match '${searchTerm}' || about match '${searchTerm}']{
        image {
            asset -> {
                url
            }
        },
        _id,
        destination,
        postedBy -> {
            _id,
            userName,
            avatar
        },
        save[] {
            _key,
            postedBy -> {
                _id,
            userName,
            avatar
            }
        }
    }`

  const res = client.fetch(query)
  return res
}

export const feedQuery = () => {
  const query = `*[_type == 'pin'] | order(_createdAt desc) {
        image {
            asset -> {
                url
            }
        },
        _id,
        destination,
        postedBy -> {
            _id,
            userName,
            avatar
        },
        save[] {
            _key,
            postedBy -> {
                _id,
            userName,
            avatar
            }
        }
    }`
  const res = client.fetch(query)
  return res
}
export const pinDetailQuery = (pinId) => {
  const query = `*[_type == "pin" && _id == '${pinId}']{
    image{
      asset->{
        url
      }
    },
    _id,
    title, 
    about,
    category,
    destination,
    postedBy->{
      _id,
      userName,
      avatar
    },
   save[]{
      postedBy->{
        _id,
        userName,
        avatar
      },
    },
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        userName,
        avatar
      },
    }
  }`;
  return query;
};

export const pinDetailMorePinQuery = (pin) => {
  const query = `*[_type == "pin" && category == '${pin.category}' && _id != '${pin._id}' ]{
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      avatar
    },
    save[]{
      _key,
      postedBy->{
        _id,
        userName,
        avatar
      },
    },
  }`;
  return query;
};


export const userQuery = (userId) => {
  const query = `*[_type == "user" && _id == '${userId}']`;
  return query;
};

export const userCreatedPinsQuery = (userId) => {
  const query = `*[ _type == 'pin' && userId == '${userId}'] | order(_createdAt desc){
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      avatar
    },
    save[]{
      postedBy->{
      _id,
      userName,
      avatar
    },
    },
  }`;
  return query;
};

export const userSavedPinsQuery = (userId) => {
  const query = `*[_type == 'pin' && '${userId}' in save[].userId ] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      avatar
    },
    save[]{
      postedBy->{
      _id,
      userName,
      avatar
    },
    },
  }`;
  return query;
};
