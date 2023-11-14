import cv2
import pytesseract
import re
import json

# Configura la ruta al ejecutable de Tesseract OCR
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

# Función para convertir el formato "mm:ss" a minutos
def convert_to_minutes(time_format):
    # Divide el formato en horas y minutos
    match = re.match(r'(\d+):(\d+)', time_format)
    if match:
        hours, minutes = map(int, match.groups())
        total_minutes = hours * 60 + minutes
        return total_minutes
    return None

# Función para procesar la imagen y realizar OCR
def process_image(image):
    # Convierte la imagen a escala de grises
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    # Aplica un umbral adaptativo para resaltar los caracteres
    _, threshold = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    
    # Aplica un filtro para enfocarse en números en formato "mm:ss"
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (3, 3))
    filtered = cv2.morphologyEx(threshold, cv2.MORPH_OPEN, kernel)
    
    # Utiliza Tesseract para realizar OCR en la imagen procesada
    custom_config = r'--oem 3 --psm 6 -c tessedit_char_whitelist=0123456789:'
    text = pytesseract.image_to_string(filtered, config=custom_config)
    
    # Imprime el texto detectado
    print("Texto detectado:", text)
    
    # Filtra solo los números en formato "mm:ss"
    time_format_strings = re.findall(r'\d+:\d+', text)
    
    # Convierte los formatos "mm:ss" a minutos
    time_formats_minutes = [convert_to_minutes(time) for time in time_format_strings]
    
    # Dibuja el texto en la imagen
    cv2.putText(image, f"Números: {', '.join(map(str, time_formats_minutes))} minutos", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
    
    return image, time_formats_minutes

# Función para procesar la imagen de la cámara y realizar OCR
def process_camera_image():
    # Inicia la captura de video desde la cámara
    cap = cv2.VideoCapture(0)

    while True:
        ret, frame = cap.read()

        # Aplica tu lógica de procesamiento de imagen aquí...

        # Detecta si se ha presionado la tecla 't'
        if cv2.waitKey(1) & 0xFF == ord('t'):
            # Gira la imagen 360 grados
            rows, cols, _ = frame.shape
            rotation_matrix = cv2.getRotationMatrix2D((cols / 2, rows / 2), 360, 1)
            rotated_frame = cv2.warpAffine(frame, rotation_matrix, (cols, rows))
            
            # Desactiva el modo espejo
            rotated_frame = cv2.flip(rotated_frame, 1)
            
            # Llama a la función para procesar la imagen y realizar OCR
            processed_frame, time_formats_minutes = process_image(rotated_frame)
            
            # Agrega los tiempos en minutos a la lista
            all_numbers.extend(time_formats_minutes)
            
            # Muestra la imagen con el texto superpuesto
            cv2.imshow('Processed Image', processed_frame)
            
            # Muestra los números reconocidos en la consola en formato de minutos
            print("Números encontrados en minutos:", ', '.join(map(str, time_formats_minutes)))
            
            # Muestra la lista acumulada de todos los números encontrados en minutos
            total_minutes = sum(all_numbers)
            print(f"Todos los números encontrados hasta ahora en minutos: {total_minutes}")

        # Sale del bucle si se presiona la tecla 'q'
        elif cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # Libera los recursos
    cap.release()
    cv2.destroyAllWindows()

# Inicializa la lista de números encontrados
all_numbers = []

# Llama a la función para procesar la imagen de la cámara
process_camera_image()
