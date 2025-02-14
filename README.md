# Lean Techniques Photo Showcase

## To run this app locally:
Install dependencies and run start script

```bash
npm install && npm start
```

**Note:**
You will first want to add a local `.env` at the project root as it's excluded from source. It will need to include the following:

- HOST_SERVER (the host to run the project, usually localhost)
- HOST_PORT (your choice of port to run the project, 5222 for example)
- LEAN_TECHNIQUES_PHOTO_SERVICE_BASE_URL (the base url of the photo service, https://showcase.leantechniques.com)
- LEAN_TECHNIQUES_PHOTO_SERVICE_API_KEY_HEADER (the expected lt photo serviceapi key, lt_api_key)
- LEAN_TECHNIQUES_PHOTO_SERVICE_API_KEY ({lt api key>})