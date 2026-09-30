#!/usr/bin/env python3
import http.server
import socketserver
import socket
import os

PORT = 8080

def get_ip_address():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(('8.8.8.8', 80))
        ip = s.getsockname()[0]
    except Exception:
        ip = '127.0.0.1'
    finally:
        s.close()
    return ip

Handler = http.server.SimpleHTTPRequestHandler
local_ip = get_ip_address()

print("==================================================================")
print("  MADANAPURAM GRAM PANCHAYAT - LOCAL WI-FI e-TAPPAL SERVER")
print("==================================================================")
print(f"  Starting local offline server on Port {PORT}...")
print(f"  Office PC Access       : http://localhost:{PORT}")
print(f"  Mobile / Tablet Access : http://{local_ip}:{PORT}")
print("==================================================================")
print("  Ensure all office phones/tablets are connected to the same")
print("  office Wi-Fi router or phone hotspot. No internet needed!")
print("==================================================================")

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down server.")
